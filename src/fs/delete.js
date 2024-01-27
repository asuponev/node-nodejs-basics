import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';

const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filesFolder = path.join(__dirname, 'files');
  const fileName = 'fileToRemove.txt';
  const filePath = path.join(filesFolder, fileName);
  const errorMessage = 'FS operation failed';

  try {
    try {
      await fs.stat(filePath);
    } catch (error) {
      throw new Error(errorMessage);
    }

    await fs.unlink(filePath);
  } catch (error) {
    if (error.message === errorMessage) {
      console.log(error.message);
    }
  }
};

await remove();
