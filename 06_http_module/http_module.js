const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.write("<h1>Welcome to our home page</h1> <h2>This is our home page</h2>");
        res.end();
    }
    if (req.url === "/source") {
        res.write("Welcome to our source page.  This is our source page");
        res.end();
    }
    if (req.url === "/contact") {
        res.setHeader("Content-Type", "text/html");
        res.write("Welcome to our contact page.  This is our contact page");
        res.end();
    }
});

//web server

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});