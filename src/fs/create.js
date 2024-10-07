import fs from "fs/promises";
import path from "path";

import * as url from "url";

import { SOURCES_FOLDER_NAME } from "../constants.js";

import { EEXIST_ERROR_CODE, FsOperaionError, UnexpectedError } from "../custom-errors.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const BASE_FILE_NAME = "fresh";
const FILE_EXTENSION = ".txt";

const FILE_NAME = `${BASE_FILE_NAME}${FILE_EXTENSION}`

const getFilePath = (fileName = '', folderName = SOURCES_FOLDER_NAME) => {
    return path.join(__dirname, folderName, fileName);
}

const filePath = getFilePath(FILE_NAME);

const FILE_CONTENT = "I am fresh and young";

const create = async () => {

    try {
 
        await fs.writeFile(filePath, FILE_CONTENT, { flag: "wx" });

    }

    catch(error) {

        if (error.code === EEXIST_ERROR_CODE) {
            throw new FsOperaionError(error)
        }

        throw new UnexpectedError()
    }
};

await create();