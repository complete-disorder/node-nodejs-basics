import fs from "fs/promises";
import path from "path";

import * as url from "url";

import { SOURCES_FOLDER_NAME, COPIES_FOLDER_NAME } from "../constants.js";

import { UnexpectedError, FsOperaionError, RelativePathError, EEXIST_ERROR_CODE } from "../custom-errors.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const getAbsolutePath = (relativePath = '') => {

    if (!relativePath) {

        throw new RelativePathError();

    }

    return path.join(__dirname, relativePath);
}

const getFilePath = (folderPath = '', fileName = '') => {
    return path.join(folderPath, fileName)
}

const sourceFilesPath = getAbsolutePath(SOURCES_FOLDER_NAME);
const copiesFilesPath = getAbsolutePath(COPIES_FOLDER_NAME);

const copy = async () => {
    try {
        const fileNames = await fs.readdir(sourceFilesPath);
        await fs.mkdir(copiesFilesPath);

        for (const fileName of fileNames) {
            const sourceFilePath = getFilePath(sourceFilesPath, fileName);
            const copyFilePath = getFilePath(copiesFilesPath, fileName);

            await fs.copyFile(sourceFilePath, copyFilePath);
          }
    }

    catch(error) {
        if (error.code === EEXIST_ERROR_CODE) {
            throw new FsOperaionError(error)
        }

        throw new UnexpectedError()
    }
};

await copy();
