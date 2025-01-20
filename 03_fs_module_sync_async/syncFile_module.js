//! Synchronous  way;

const fs = require("fs");
const path = require("path");

const fileName = "hello.txt";
const fileName2 = "../Day-02/os_module.js";
const filePath = path.join(__dirname, fileName); 

const result = fs.writeFileSync(filePath, "Hello World!", "utf-8"); //* write text to file
console.log(result);

const readFile = fs.readFileSync(filePath);
console.log(readFile.toString());

const readFile2 = fs.readFileSync(filePath, "utf-8"); //* read text from file
console.log(readFile2);


fs.appendFileSync(filePath, "\nHello World!"); //* append text

fs.unlinkSync(filePath); //* delete file

fs.renameSync(filePath, path.join(__dirname, "hello2.txt")); //* rename file