const parseArgs = () => {
    const array = [];
    const argv = process.argv.slice(2);
    for (let i = 0; i < argv.length; i += 2) {
      if (argv[i].startsWith("--")) {
        const arg = `${argv[i].slice(2)} is ${argv[i + 1]}`;
        array.push(arg);
      }
    }
    console.log(array.join(', '))
};

parseArgs();