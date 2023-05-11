
Relayer Metrics Exporter is a tool designed to monitor and analyze IBC relayer activity and performance. It connects to one or multiple Cosmos-SDK based network, listens for new blocks, and captures relevant IBC messages to provide insights into relayer performance.

## Features

- Decodes and analyzes IBC messages from new blocks
- Tracks relayers, packets, sequences and execution (tx ordering)
- Identifies frontrun packets and affected signers
- Stores data in an in-memory SQLite database
- Provides metrics and logs for analysis

## Requirements

- Node.js (v12 or above)
- npm (Node Package Manager)
- WebSocket connection to a blockchain network

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/relayer-metrics-exporter.git
npm install
```

## Configuration

Open the config.js file and update the configuration parameters. It accepts an array of `chains` for multi-chain config.

## Usage

Start the relayer metrics exporter:

```bash
npm start
```

The exporter will establish a WebSocket connection, New blocks will be processed, and relevant IBC messages will be decoded and analyzed.

Metrics will be exposed on `localhost:3000/metrics` per default.

## Metrics Exposed

ibc_effected_packets{chain_id, src_channel, src_port, dst_channel, dst_port, signer}
ibc_uneffected_packets{chain_id, src_channel, src_port, dst_channel, dst_port, signer}
ibc_frontrun_counter{chain_id, src_channel, src_port, dst_channel, dst_port, signer, frontrunned_by}