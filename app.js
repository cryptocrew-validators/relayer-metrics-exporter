import { createRequire } from "module";
const require = createRequire(import.meta.url);
import prometheus from 'prom-client';
import express from 'express';

const { Worker } = require('worker_threads');

import config from './config.js';

const app = express();
const port = config.port;

for (const chain of config.chains) {
  const worker = new Worker('./websocketWorker.js');
  worker.postMessage(chain);

  worker.on('error', (error) => {
    console.error('Worker error:', error);
  });

  worker.on('exit', (code) => {
    if (code !== 0)
      console.error(`Worker stopped with exit code ${code}`);
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