const axios = require('axios');
const WebSocket = require('ws');
const { Tx } = require('cosmjs-types/cosmos/tx/v1beta1/tx');
const { deserializeMessage } = require('./ibc_helper.js')

const config = require('./config.js');

// Function to handle new blocks
async function handleNewBlock(chain, height) {
  try {
    const res = await axios.get(`${chain.rpcUrl}/block?height=${height}`);
    const block = res.data.result.block;
    const txs = block.data.txs;

    if (txs) {
      txs.forEach((tx) => {
        const buff = Buffer.from(tx, 'base64');
        const transaction = Tx.decode(buff);
        const msgs = transaction.body.messages;

        msgs.forEach((msg) => {
          if (msg.typeUrl.startsWith('/ibc')) {
            deserializeMessage(msg);
            // Log decoded message
            if (msg.result.includes('Unhandled')) {
              console.warn(msg.result);
            }
            console.log(msg);
          }
        });
      });
    }
  } catch (error) {
    console.error(`Error fetching block ${height}:`, error.message);
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

config.chains.forEach((chain) => {
  startBlockListener(chain);
});
