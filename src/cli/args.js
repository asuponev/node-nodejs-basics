const parseArgs = () => {
  const args = process.argv;

  for (let i = 2; i < args.length; i += 2) {
    const name = args[i].startsWith('--') ? args[i].slice(2) : args[i];
    const value = args[i + 1];
    console.log(`${name} is ${value}`);
  }
};

parseArgs();
