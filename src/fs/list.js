import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';

const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filesFolder = path.join(__dirname, 'files');
  const errorMessage = 'FS operation failed';

  try {
    try {
      await fs.access(filesFolder);
    } catch (error) {
      throw new Error(errorMessage);
    }

    const content = await fs.readdir(filesFolder);
    console.log(content);
  } catch (error) {
    if (error.message === errorMessage) {
      console.log(error.message);
    }
  }
};

await list();
