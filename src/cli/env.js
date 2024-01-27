const parseEnv = () => {
  const rss = 'RSS_';
  const variables = process.env;

  Object.keys(variables).forEach((variable) => {
    if (variable.startsWith(rss)) {
      console.log(`${variable}=${variables[variable]}`);
    }
  });
};

parseEnv();
