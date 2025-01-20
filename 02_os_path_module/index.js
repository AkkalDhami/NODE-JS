//! Module in nodejs:

//? A module is a collection of related JavaScript code.
//? It can be a single file or a directory of files.
//? Modules are used to organize your code and make it more reusable and maintainable.

const { add, subtract, multiply, PI: p } = require("./math")
const math = require("./math");

console.log(add(5, 5));

console.log(subtract(5, 5));

console.log(multiply(5, 5));

console.log(math.divide(5, 5));

console.log(p);
