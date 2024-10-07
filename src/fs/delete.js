import fs from "fs/promises";
import path from "path";
import * as url from "url";
import {
    SOURCES_FOLDER_NAME,
    throwEror
} from "../constants.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const FILENAME = "fileToRemove.txt";
const FILE_PATH = path.join(__dirname, SOURCES_FOLDER_NAME, FILENAME);

const remove = async () => {
  try {
    await fs.rm(FILE_PATH);
  } catch {
    throwEror();
  }
};

await remove();