import { Worker } from "worker_threads";
import { fileURLToPath } from "url";
import path from "path";
import os from "os";

const { length: numberOfCores } = os.cpus();
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const WORKER_PATH = path.join(__dirname, "worker.js");

const runService = (workerData) =>
  new Promise((resolve, reject) => {
    const worker = new Worker(WORKER_PATH, {
      workerData,
    });
    worker.postMessage(workerData);
    worker.on("message", resolve);
    worker.on("error", reject);
  });

const performCalculations = async () => {
  try {
    const promises = Array(numberOfCores)
      .fill(10)
      .map((num, index) => runService(num + index));
    const results = await Promise.all(promises);
    console.log(results);
  } catch (error) {
    console.log(error.message);
  }
};

performCalculations();