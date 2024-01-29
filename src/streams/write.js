import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filesFolder = path.join(__dirname, 'files');
  const fileName = 'fileToWrite.txt';
  const filePath = path.join(filesFolder, fileName);
  const stream = fs.createWriteStream(filePath, { encoding: 'utf8' });

  console.log('Enter something and press Ctrl+C to finish')

  process.stdin.on('data', (chunk) => {
    stream.write(chunk);
  });

  stream.on('error', (error) => {
    console.error(error.message);
  });
};

await write();
