import { createReadStream } from "fs";
import { createHash } from "crypto";
import path from "path";
import * as url from "url";
import {
    SOURCES_FOLDER_NAME,
    FILE_TO_CALCULATE_HASH_FOR,
} from '../constants.js';

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const PATH = path.join(__dirname, SOURCES_FOLDER_NAME, FILE_TO_CALCULATE_HASH_FOR);

const calculateHash = async () => {
        const hash = createHash('sha256');
        const stream  = createReadStream(PATH)

        stream.on('data', (chunk) => {
            hash.update(chunk);
        });

        stream.on('end', () => {
            const finalHex = hash.digest('hex')
            console.log(finalHex);
        });

        stream.on('error', (error) => {
            console.error(error.message);
        });

};

await calculateHash();