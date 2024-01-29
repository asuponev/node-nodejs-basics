import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import zlib from 'node:zlib';
import { pipeline } from 'node:stream/promises';

const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filesFolder = path.join(__dirname, 'files');
  const inputFilePath = path.join(filesFolder, 'archive.gz');
  const outputFilePath = path.join(filesFolder, 'fileToCompress.txt');
  const readStream = fs.createReadStream(inputFilePath);
  const gzipStream = zlib.createGunzip();
  const writeStream = fs.createWriteStream(outputFilePath);

  try {
    await pipeline(
      readStream,
      gzipStream,
      writeStream
    );
  } catch (error) {
    console.error(error.message);
  }
};

await decompress();
