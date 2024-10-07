import fs from "fs/promises";
import path from "path";
import * as url from "url";
import {
    SOURCES_FOLDER_NAME,
    throwEror,
} from "../constants.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const FILES_PATH = path.join(__dirname, SOURCES_FOLDER_NAME)

const list = async () => {
    try {
        const fileNames = await fs.readdir(FILES_PATH)
        console.log(fileNames)
    }
    catch {
        throwEror()
    }
};

await list();