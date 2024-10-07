import { createReadStream } from "fs";
import { fileURLToPath } from "url";
import path from "path";

import { FsOperaionError } from "../custom-errors.js";

import {
    SOURCES_FOLDER_NAME,
    FILE_TO_READ,
    ERROR_EVENT,
  } from "../constants.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const { stdout } = process;

const FILE_TO_READ_PATH = path.join(
    __dirname,
    SOURCES_FOLDER_NAME,
    FILE_TO_READ
  );


  export const throwEror = () => {
    throw new FsOperaionError();
  };
  


const read = async () => {
    const readStream = createReadStream(FILE_TO_READ_PATH);
    readStream.on(ERROR_EVENT, throwEror);
    readStream.pipe(stdout);
};

await read();