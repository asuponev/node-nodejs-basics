import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filesFolder = path.join(__dirname, 'files');
  const oldFileName = 'wrongFilename.txt';
  const newFileName = 'properFilename.md';
  const filePathOld = path.join(filesFolder, oldFileName);
  const filePathNew = path.join(filesFolder, newFileName);
  const errorMessage = 'FS operation failed';

  try {
    try {
      await fs.stat(filePathOld);
    } catch (error) {
      throw new Error(errorMessage);
    }

    try {
      await fs.stat(filePathNew);
      throw new Error(errorMessage);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    await fs.rename(filePathOld, filePathNew);
  } catch (error) {
    console.log(error.message);
  }
};

await rename();
