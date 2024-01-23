import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const folderPathOrigin = path.join(__dirname, 'files');
  const folderPathCopy = path.join(__dirname, 'files_copy');
  const errorMessage = 'FS operation failed';

  try {
    await fs.access(folderPathCopy);
    throw new Error(errorMessage);
  } catch (error) {
    if (error.message === errorMessage) {
      console.log(error.message);
      return;
    }
    await fs.mkdir(folderPathCopy);
    const files = await fs.readdir(folderPathOrigin);
    files.forEach(async (file) => {
      const originPath = path.join(folderPathOrigin, file);
      const copyPath = path.join(folderPathCopy, file);
      await fs.copyFile(originPath, copyPath);
    });
  }
};

await copy();

