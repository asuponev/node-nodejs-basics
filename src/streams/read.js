import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filesFolder = path.join(__dirname, 'files');
  const fileName = 'fileToRead.txt';
  const filePath = path.join(filesFolder, fileName);
  const stream = fs.createReadStream(filePath, { encoding: 'utf8' });

  stream.pipe(process.stdout);

  stream.on('error', (error) => {
    console.error(error.message);
  });
};

await read();
