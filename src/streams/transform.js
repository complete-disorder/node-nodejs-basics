import { Transform } from "stream";

const { stdin, stdout } = process;


const transform = async () => {
    const transform = new Transform({
        transform(chunk, _, callback) {
          const reversedString = chunk.toString().split("").reverse().join("");
          callback(null, reversedString);
        },
      });
      stdin.pipe(transform).pipe(stdout);
};

await transform();