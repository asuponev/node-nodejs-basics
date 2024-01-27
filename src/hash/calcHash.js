import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import crypto from 'crypto';

const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filesFolder = path.join(__dirname, 'files');
  const fileName = 'fileToCalculateHashFor.txt';
  const filePath = path.join(filesFolder, fileName);

  const stream = fs.createReadStream(filePath);
  const hash = crypto.createHash('sha256');

  stream.on('data', (data) => {
    hash.update(data);
  });

  stream.on('end', () => {
    const sha256Hash = hash.digest('hex');
    console.log(`SHA256 hash for ${fileName}: ${sha256Hash}`);
  });

  stream.on('error', (error) => {
    console.error(error.message);
  });
};

await calculateHash();
