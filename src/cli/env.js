const parseEnv = () => {
    const array = [];
    const { env } = process;
    for (const key in env) {
      if (key.startsWith("RSS_")) {
        array.push(`${key}=${env[key]}`);
      }
    }
    console.log(array.join("; "));
};

parseEnv();