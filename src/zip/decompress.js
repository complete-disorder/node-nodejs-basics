import path from "path";
import { fileURLToPath } from "url";
import { createReadStream, createWriteStream } from "fs";
import { createUnzip } from "zlib";

import {
  FILE_TO_COMPRESS,
  ARCHIVE,
  SOURCES_FOLDER_NAME,
  ERROR_EVENT,
  throwEror
} from "../constants.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const ARCHIVE_PATH = path.join(__dirname, SOURCES_FOLDER_NAME, ARCHIVE);
const FINAL_FILE_PATH = path.join(
    __dirname,
    SOURCES_FOLDER_NAME,
    FILE_TO_COMPRESS
  );

const decompress = async () => {
    const gzip = createUnzip();
    const source = createReadStream(ARCHIVE_PATH);
    const destination = createWriteStream(FINAL_FILE_PATH);
    source.on(ERROR_EVENT, throwEror)
    destination.on(ERROR_EVENT, throwEror)
    source.pipe(gzip).pipe(destination);
};

await decompress();