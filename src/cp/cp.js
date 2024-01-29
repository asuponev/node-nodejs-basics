import { spawn } from 'node:child_process';

const spawnChildProcess = async (args) => {
  const childProcess = spawn('node', ['./src/cp/files/script.js', ...args], {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
  });

  process.stdin.pipe(childProcess.stdin);

  childProcess.stdout.pipe(process.stdout);

  childProcess.on('error', (error) => {
    console.error(error.message);
  });
};

spawnChildProcess(['someArgument1', 'someArgument2', 'someArgument3']);
