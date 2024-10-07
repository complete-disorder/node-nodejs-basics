import fs from "fs/promises";
import path from "path";

import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const SOURCES_FOLDER_NAME = "files";

const BASE_FILE_NAME = "fresh";
const FILE_EXTENSION = ".txt";

const FILE_NAME = `${BASE_FILE_NAME}${FILE_EXTENSION}`

const getFilePath = (fileName = '', folderName = SOURCES_FOLDER_NAME) => {
    return path.join(__dirname, folderName, fileName);
}

const filePath = getFilePath(FILE_NAME);

const FILE_CONTENT = "I am fresh and young";

const EEXIST_ERROR_CODE = 'EEXIST'

class FsOperaionError extends Error {
    constructor(originalError){
        super("FS operation failed")
        this.name = "FsOperaionError"
        this.originalError = originalError
    }
}

class UnexpectedError extends Error {
    constructor(originalError){
        super("Unexpected error occurred")
        this.name = "UnexpectedError"
        this.originalError = originalError
    }
}


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