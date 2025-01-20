console.log("Hello World!");

//! Nodejs:

//* Open-source, server-side JavaScript runtime.
//* Allows you to run JavaScripton your machine or servers.
//* Built on the V8 JavaScript engine for speed.

//?  Node.js is not a programming language or a framework, but rather a JavaScript runtime environment that allows developers to run JavaScript outside of a browser


//! Introduction to REPL (Read-Eval-Print Loop

//? It stands for Read-Eval-Print Loop or Read, Evaluate, Print and Loop.
//? It’s an interactive programming environment that allows you to execute JavaScript code one statement at a time.
//? You can open your terminal and use node command


//! What is CLI?

//? CLI (Command Line Interface) is a way to execute predefined JavaScript files or  run commands for tasks like installing packages, running scripts, or starting  applications


//! Node.js Context - global

//? In Node.js, there's no window or document. Why? Because Node.js runs outside the browser—it doesn't deal with the DOM or browser-specific APIs.

//? Instead, Node.js has a global object.It's the equivalent of window in the browser but designed for a server-side environment.

//! globalThis

//? globalThis is a reference to the global object in the Node.js runtime environment.

//? globalThis is a new feature introduced in ECMAScript 2020 (ES11) that provides a standard way to access the global object in any JavaScript environment.

console.log(globalThis);