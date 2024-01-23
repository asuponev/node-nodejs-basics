import fs from 'node:fs/promises';

const create = async () => {
  const fileName = 'fresh.txt';
  const content = 'I am fresh and young';
  const errorMessage = 'FS operation failed';

  try {
    await fs.readFile(fileName);
    throw new Error(errorMessage);
  } catch (error) {
    await fs.writeFile(fileName, content);
    if (error.message === errorMessage) {
      console.log(error.message);
    }
  }
};

await create();
