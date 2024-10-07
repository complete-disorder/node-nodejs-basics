import path from "path";
import { fileURLToPath } from "url";
import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";

import {
  FILE_TO_COMPRESS,
  ARCHIVE,
  SOURCES_FOLDER_NAME,
  ERROR_EVENT,
  throwEror,
} from "../constants.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const SOURCE_FILE_PATH = path.join(
  __dirname,
  SOURCES_FOLDER_NAME,
  FILE_TO_COMPRESS
);

const ARCHIVE_PATH = path.join(__dirname, SOURCES_FOLDER_NAME, ARCHIVE);

const compress = async () => {
  const gzip = createGzip();
  const source = createReadStream(SOURCE_FILE_PATH);
  const destination = createWriteStream(ARCHIVE_PATH);
  source.on(ERROR_EVENT, throwEror);
  destination.on(ERROR_EVENT, throwEror);
  source.pipe(gzip).pipe(destination);
};

await compress();