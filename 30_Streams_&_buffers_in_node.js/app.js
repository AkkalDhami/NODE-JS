import { createReadStream, createWriteStream, readFile, writeFile } from "fs";
import path from "path";

const inputPath = path.join(import.meta.dirname, "input.txt");
const outputPath = path.join(import.meta.dirname, "output.txt");

const readStream = createReadStream(inputPath, {
    encoding: "utf-8",
    highWaterMark: 200 * 1024
});

const writeStream = createWriteStream(outputPath);

readStream.pipe(writeStream);

readStream.on("data", (chunk) => {
    console.log("Buffer: ", Buffer.from(chunk));
    console.log("Chunk: ", chunk);
    writeStream.write(chunk);
});

readStream.on("end", () => console.log("End"));
readStream.on("error", (err) => console.log(err));
writeStream.on("finish", () => console.log("Write finished"));

readFile(inputPath, "utf-8", (err, data) => {
    if (err) console.error(err);
        
    else {
        console.log(data);
        writeFile(outputPath, data, (err) => console.log(err));
    }
})

