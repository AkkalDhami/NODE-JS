// Import EventEmitter class
const EventEmitter = require("events");

// Create an instance of EventEmitter
const emitter = new EventEmitter();

// 1. Define an event listener (addListener)
emitter.on("greet", () => {
  console.log(`hello world`);
});
// 2. Trigger (emit) the "greet" event
emitter.emit("greet");


emitter.addListener("hello", () => {
    console.log(`hello world2`);
})
emitter.emit("hello");


//* You can also pass arguments while emitting.

emitter.on("greet2", (username) => {
  console.log(`hello ${username}`);
});
emitter.emit("greet2", "Aavash");

emitter.on("greet3", (username, prof) => {
    console.log(`hello ${username}, You are a ${prof}`);
});
emitter.emit("greet3", "Aavash Dhami", "Full Stack Dev");


//! but it's best idea to take a single argument as an object.

emitter.on("greet4", (arg) => {
    console.log(`hello ${arg.username}, You are a ${arg.prof}`);
});
emitter.emit("greet4", { username: "Aavash Dhami", prof: "Full Stack Dev" });