import * as url from "url";
import fs from "fs/promises";
import path from "path";

import { SOURCES_FOLDER_NAME } from "../constants.js";
import { EEXIST_ERROR_CODE, ENOENT_ERROR_CODE, UnexpectedError, FsOperaionError } from "../custom-errors.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const ORIGINAL_FILE_NAME = "wrongFilename.txt";
const NEW_FILE_NAME = "properFilename.md";

const sourcesFolderRPath = path.join(__dirname, SOURCES_FOLDER_NAME);

const getAbsolutePath = (relativePath = '') => {
    return path.join(sourcesFolderRPath, relativePath)
}

const originalFilePath = getAbsolutePath(ORIGINAL_FILE_NAME);
const newFilePath = getAbsolutePath(NEW_FILE_NAME);


const isFileExists = async (filePath = '') => {
    
    try {
      await fs.access(filePath);

      return true;
    } 
    
    catch {
      return false;
    }
  };
  

const rename = async () => {
    
    try {
       const isExist = await isFileExists(newFilePath)

       if (isExist) {
           throw new FsOperaionError()
       }

       await fs.rename(originalFilePath, newFilePath)

    }

    catch(error) {
        if (error.code === EEXIST_ERROR_CODE || error.code === ENOENT_ERROR_CODE) {
            throw new FsOperaionError(error)
        }

        if (error.name === 'FsOperaionError' ) {
            throw new FsOperaionError(error)
        }

        throw new UnexpectedError()

    }

};

await rename();