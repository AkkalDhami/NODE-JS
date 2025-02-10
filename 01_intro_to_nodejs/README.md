# Introduction to Node.js

## What is Node.js?
Node.js is an open-source, cross-platform JavaScript runtime environment that allows developers to execute JavaScript code outside the web browser. It is built on Chrome's V8 JavaScript engine and enables the development of scalable network applications.

## Features of Node.js
- **Asynchronous & Event-Driven**: Non-blocking I/O model for high performance.
- **Single-Threaded & Scalable**: Uses event-driven architecture for handling multiple connections.
- **Cross-Platform**: Runs on Windows, macOS, and Linux.
- **Fast Execution**: Built on the V8 engine, making it efficient.
- **Rich Ecosystem**: NPM (Node Package Manager) provides numerous libraries and tools.

## Why Use Node.js?
- **Real-Time Applications**: Ideal for chat applications, streaming services, and gaming platforms.
- **Microservices Architecture**: Perfect for building scalable and maintainable applications.
- **Server-Side Development**: Enables JavaScript to run on the backend.
- **APIs and RESTful Services**: Simplifies API development using frameworks like Express.js.

## Installing Node.js
1. Download Node.js from the [official website](https://nodejs.org/).
2. Install the LTS (Long-Term Support) version for stability.
3. Verify installation by running:
   ```sh
   node -v
   npm -v
   ```

## Running Your First Node.js Script
Create a file `app.js` and write the following code:

```javascript
console.log("Hello, Node.js!");
```

Run the script using:
```sh
node app.js
```

## Node.js Modules
Node.js has built-in modules that provide various functionalities:
- **fs**: File System module
- **http**: Create web servers
- **path**: Work with file and directory paths
- **os**: Retrieve system-related information

Example of creating an HTTP server:
```javascript
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});
server.listen(3000, () => console.log('Server running on port 3000'));
```

## Conclusion
Node.js is a powerful tool for modern web development, providing an efficient, scalable, and high-performance environment. Whether you're building APIs, microservices, or real-time applications, Node.js is a great choice.

