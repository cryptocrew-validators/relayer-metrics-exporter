const axios = require('axios');
const WebSocket = require('ws');
const prometheus = require('prom-client');
const express = require('express');

const { Tx } = require('cosmjs-types/cosmos/tx/v1beta1/tx');
const { decodeMessage } = require('./ibc_helper.js');
const db = require('./db.js');
const config = require('./config.js');

const app = express();
const port = config.port;

// Define metrics
const effectedPackets = new prometheus.Gauge({
  name: 'ibc_effected_packets',
  help: 'Counts the number of IBC packets that are affected',
  labelNames: ['chain_id', 'src_channel', 'src_port', 'dst_channel', 'dst_port', 'signer'],
});

const uneffectedPackets = new prometheus.Gauge({
  name: 'ibc_uneffected_packets',
  help: 'Counts the number of IBC packets that are not affected',
  labelNames: ['chain_id', 'src_channel', 'src_port', 'dst_channel', 'dst_port', 'signer'],
});

// Save new packet and check if it already has been handled
async function savePacket(msg) {
  const packetParams = [
    msg.value.packet.sourceChannel,
    msg.value.packet.sourcePort,
    msg.value.packet.destinationChannel,
    msg.value.packet.destinationPort,
    msg.value.packet.sequence.low,
  ];

  const query = `
    SELECT * FROM packets
    WHERE source_channel = ? 
    AND source_port = ? 
    AND destination_channel = ? 
    AND destination_port = ? 
    AND sequence = ?
  `;

  const existingPacket = await db.get(query, packetParams);
  if (!existingPacket || !existingPacket.signer_id) {
    msg.effected = true;
    effectedPackets.labels(
      msg.chainId,
      msg.value.packet.sourceChannel,
      msg.value.packet.sourcePort,
      msg.value.packet.destinationChannel,
      msg.value.packet.destinationPort,
      msg.value.signer
    ).inc();
  } else {
    msg.effected = false;
    msg.effectedSigner = existingPacket.signer;
    uneffectedPackets.labels(
      msg.chainId,
      msg.value.packet.sourceChannel,
      msg.value.packet.sourcePort,
      msg.value.packet.destinationChannel,
      msg.value.packet.destinationPort,
      msg.value.signer
    ).inc();
  }

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Save the signer if not exists
      db.run('INSERT OR IGNORE INTO signers (signer) VALUES (?)', msg.value.signer, function (err) {
        if (err) {
          reject('Error saving signer: ' + err.message);
          return;
        }

        // Get the signer
        db.get('SELECT id FROM signers WHERE signer = ?', msg.value.signer, (err, row) => {
          if (err) {
            reject('Error fetching signer ID: ' + err.message);
            return;
          }

          const signerId = row.id;

          // Save the packet
          db.run(
            'INSERT INTO packets (chain_id, signer_id, sequence, source_channel, source_port, destination_channel, destination_port, msg_type_url, created_at, effected) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime("now"), ?)',
            [
              msg.chainId,
              signerId, 
              msg.value.packet.sequence.low, 
              msg.value.packet.sourceChannel, 
              msg.value.packet.sourcePort, 
              msg.value.packet.destinationChannel, 
              msg.value.packet.destinationPort, 
              msg.typeUrl,
              msg.effected,
            ],
            function (err) {
              if (err) {
                reject('Error saving packet: ' + err.message);
              } else {
                resolve(msg);
              }
            }
          );
        });
      });
    });
  });
}

// Function to handle new blocks
async function handleNewBlock(chain, height) {
  try {
    const res = await axios.get(`${chain.rpcUrl}/block?height=${height}`);
    const block = res.data.result.block;
    const txs = block.data.txs;

    if (txs) {
      for (const tx of txs) {
        const buff = Buffer.from(tx, 'base64');
        const transaction = Tx.decode(buff);
        const msgs = transaction.body.messages;

        for (let msg of msgs) {
          if (msg.typeUrl.startsWith('/ibc')) {
            decodeMessage(msg);
            msg.chainId = block.header.chain_id
            // Log decoded message
            if (msg.result.includes('Undecoded')) {
              console.warn(msg);
            } else {
              if (msg.relevant) {
                try {
                  msg = await savePacket(msg);
                  const sourcePort = msg.value.packet.sourcePort;
                  const sourceChannel = msg.value.packet.sourceChannel;
                  const destinationPort = msg.value.packet.destinationPort;
                  const destinationChannel = msg.value.packet.destinationChannel;
                  const sequence = msg.value.packet.sequence.low;
                  const signer = msg.value.signer;
                  const msgTypeUrl = msg.typeUrl;
                  const effected = msg.effected;

                  console.log(`${msg.chainId} | ${sourcePort}/${sourceChannel}: ${msgTypeUrl} (${sequence}) | (${signer}) | ${effected}${effected ? '' : ' | ' + msg.effectedSigner}`);
                } catch (error) {
                  console.error(error);
                }
              }
            }
          }
        }
      }
    }
  }
  catch (error) {
    console.error(`Error at block ${height}:`, error.message);
  }
}

// Function to start listening for new blocks
function startBlockListener(chain) {
  let wsUrl = ""
  if (chain.rpcUrl.includes('https://')) {
    wsUrl = 'wss://' + chain.rpcUrl.split('https://')[1] + '/websocket';
  } else if (chain.rpcUrl.includes('http://')) {
    wsUrl = 'ws://' + chain.rpcUrl.split('http://')[1] + '/websocket';
  } else {
    console.error('RPC must be provided with prefixed http:// or https://. RPC: ', chain.rpcUrl);
    process.exit(1);
  }
  const ws = new WebSocket(wsUrl);

  ws.on('open', () => {
    console.log('WebSocket connection established.');
    ws.send(JSON.stringify({ "jsonrpc": "2.0", "id": 1, "method": "subscribe", "params": { "query": "tm.event='NewBlock'" } }));
  });

  ws.on('message', async (data) => {
    const parsedData = JSON.parse(data);
    if (parsedData.result && parsedData.result.data && parsedData.result.data.value && parsedData.result.data.value.block) {
      const blockHeight = parsedData.result.data.value.block.header.height;
      console.log(`New block received: ${blockHeight}`);
      await handleNewBlock(chain, blockHeight);
    }
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed. Retrying...');
    setTimeout(() => startBlockListener(chain), 2000);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error.message);
  });
}

// Expose Prometheus metrics at /metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(await prometheus.register.metrics());
});

// Start the HTTP server
app.listen(port, () => {
  console.log(`Prometheus metrics exposed at http://localhost:${port}/metrics`);
});

config.chains.forEach((chain) => {
  startBlockListener(chain);
});
