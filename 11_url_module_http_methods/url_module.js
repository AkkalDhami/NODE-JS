//? url module:

import fs from 'fs';
import http from 'http';
import ulr from 'url';

const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") {
        return res.end();
    }

    const log = `${Date.now()} ${req.method} ${req.url} New Request \n`;
    const myURL = ulr.parse(req.url, true);
    console.log(myURL);
    fs.appendFile("log.txt", `${log}`, "utf-8", (err) => {
        if (err) console.error(err);
    });
    console.log(myURL)
    switch (myURL.pathname) {
        case "/":
            if (req.method === "GET") return res.end("Welcome to our home page");
            res.setHeader("Content-Type", "text/html");
            res.write("<h1>Welcome to our home page</h1> <h2>This is our home page</h2> <p> This is our home page</p>");
            res.end();
            break;
        case "/source":
            const userName = myURL.query.name;
            res.end(`Welcome to our source page.  This is our source page. ${userName}`);
            break;
        case "/contact":
            res.setHeader("Content-Type", "text/html");
            res.write("Welcome to our contact page.  This is our contact page");
            res.end();
            break;
        case "/search":
            res.setHeader("Content-Type", "text/html");
            const searchTerm = myURL.query.search_query;
            res.write(`Welcome to our search page.  This is our search page. ${searchTerm}`);
            res.end();
            break;
        case "/signup":
            if (req.method === "GET") return res.end("Welcome to our signup page");
            else if(req.method === "POST"){
                res.end("You have successfully signed up");
            }
            break;
        default:
            res.write("404 Page Not Found");
            res.end();
            break;
    }

})

const PORT = 3000;
myServer.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});