import path from "path";
import { fileURLToPath } from "url";

import { spawn } from "child_process";

const FOLDER_NAME = "files";
const FILE_NAME = "script.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const FILE_PATH = path.join(__dirname, FOLDER_NAME, FILE_NAME);

const spawnChildProcess = async (args = []) => {
  const child = spawn("node", [FILE_PATH, ...args]);
  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);
};

spawnChildProcess(["someArgument1", "someArgument2"]);