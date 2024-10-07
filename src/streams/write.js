import path from "path";
import { createWriteStream } from "fs";
import { fileURLToPath } from "url";
import readline from "readline";

import {
  SOURCES_FOLDER_NAME,
  throwEror,
  FILE_TO_WRITE,
  ERROR_EVENT,
} from "../constants.js";

const createInterface = () => {
  const { stdin: input, stdout: output } = process;
  return readline.createInterface({ input, output });
};

const getPath = () => {
  const __dirname = fileURLToPath(new URL(".", import.meta.url));
  return path.join(__dirname, SOURCES_FOLDER_NAME, FILE_TO_WRITE);
};


const write = async () => {
    const rl = createInterface();
    const FILE_TO_WRITE_PATH = getPath();
    const writeStream = createWriteStream(FILE_TO_WRITE_PATH);
    writeStream.on(ERROR_EVENT, throwEror);
    rl.on("line", (line) => {
      writeStream.write(line + "\n");
    });
};

await write();