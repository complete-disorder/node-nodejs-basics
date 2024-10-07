import fs from "fs/promises";
import path from "path";
import * as url from "url";
import {
  SOURCES_FOLDER_NAME,
  FILE_TO_READ,
  throwEror,
} from '../constants.js';

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const FILE_TO_READ_PATH = path.join(__dirname, SOURCES_FOLDER_NAME, FILE_TO_READ);

const read = async () => {
  try {
   const content = await fs.readFile(FILE_TO_READ_PATH)
   console.log(content.toString());
  }
  catch {
    throwEror();
  }
};

read();