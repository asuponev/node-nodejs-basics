import { Transform } from 'node:stream';

const transform = async () => {
  const stream = new Transform({
    transform(data, encoding, callback) {
      const result = data.toString().split('').reverse().join('');
      callback(null, result);
      console.log('\n\nEnter something and press Ctrl+C to finish')
    },
  });

  console.log('Enter something and press Ctrl+C to finish')

  process.stdin.pipe(stream).pipe(process.stdout);

  stream.on('error', (error) => {
    console.error(error.message);
  });
};

await transform();
