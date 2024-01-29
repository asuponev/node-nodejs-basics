import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import zlib from 'node:zlib';
import { pipeline } from 'node:stream/promises';

const compress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filesFolder = path.join(__dirname, 'files');
  const inputFilePath = path.join(filesFolder, 'fileToCompress.txt');
  const outputFilePath = path.join(filesFolder, 'archive.gz');
  const readStream = fs.createReadStream(inputFilePath);
  const gzipStream = zlib.createGzip();
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

await compress();
