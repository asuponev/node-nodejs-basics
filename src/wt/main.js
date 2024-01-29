import { Worker, isMainThread } from 'node:worker_threads';
import os from 'node:os';

const performCalculations = async () => {
  const cpu = os.cpus().length;

  if (isMainThread) {
    console.log(`${cpu} worker threads`);
    const result = [];

    const handleMessage = (message, index) => {
      if (message.status === 'resolved') {
        result[index] = { status: 'resolved', data: message.data };
      } else {
        result[index] = { status: 'error', data: null };
      }

      if (result.length === cpu) {
        console.log(`${JSON.stringify(result)}`);
      }
    };

    for (let i = 0; i < cpu; i++) {
      const worker = new Worker('./src/wt/worker.js', { workerData: 10 + i });
      worker.on('message', (message) => handleMessage(message, i));
    }
  }
};

await performCalculations();
