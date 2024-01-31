
import prometheus from 'prom-client';

// Define metrics
export const effectedPackets = new prometheus.Gauge({
    name: 'ibc_effected_packets',
    help: 'Counts the number of IBC packets that are affected',
    labelNames: ['chain_id', 'src_channel', 'src_port', 'dst_channel', 'dst_port', 'signer', 'memo'],
  });
  
export const uneffectedPackets = new prometheus.Gauge({
    name: 'ibc_uneffected_packets',
    help: 'Counts the number of IBC packets that are not affected',
    labelNames: ['chain_id', 'src_channel', 'src_port', 'dst_channel', 'dst_port', 'signer', 'memo'],
  });
  
export const frontRunCounter = new prometheus.Gauge({
    name: 'ibc_frontrun_counter',
    help: 'Counts the number of times a signer gets frontrun by the same original signer',
    labelNames: ['chain_id', 'src_channel', 'src_port', 'dst_channel', 'dst_port', 'signer', 'frontrunned_by', 'memo'],
  });