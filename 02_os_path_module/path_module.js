//! Path Module in Node.js:

//? In Node.js, the path module provides utilities for working with file and directory paths. It's a built-in module, so you don't need to install any external packages to use it.

const path = require("path");
console.log(__dirname);
console.log(__filename);

const filePath = path.join("folder", "students", "data.txt");
console.log(filePath); //* Output: folder\students\data.txt

const parseData = path.parse(filePath);
const resolvedPath = path.resolve(filePath);
const extname = path.extname(filePath);
const dirname = path.dirname(filePath);
const basename = path.basename(filePath);
const separator = path.sep;

console.log({ parseData, resolvedPath, extname, dirname, basename, separator });
// {
//     parseData: {
//       root: '',
//       dir: 'folder\\students',
//       base: 'data.txt',
//       ext: '.txt',
//       name: 'data'
//     },
//     resolvedPath: 'C:\\WebDevelopment\\NODE JS\\Day-02\\folder\\students\\data.txt',
//     extname: '.txt',
//     dirname: 'folder\\students',
//     basename: 'data.txt',
//     separator: '\\'
// }
