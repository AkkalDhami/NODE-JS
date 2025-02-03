import { sumHandler } from "./sum.js";

const requestHandler = (req, res) => {

    if (req.url === '/') {
        res.setHeader('Content-Type', "text/html");
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>Calculator</title>
            </head>
            <body>
                <h1>Welcome To Calculator</h1>
                <a href="/calculator">Go to calculator</a>
            </body>
            </html>
            `);
        return res.end();

    } else if (req.url.toLowerCase() === '/calculator') {
        res.setHeader('Content-Type', "text/html");
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>Calculator</title>
            </head>
            <body>
                <h1>Welcome To Calculator</h1>
                <form action="/calculate-result" method="POST">
                    <input type="text" placeholder="Enter First Number" name="firstNum" /> <br>
                    <input type="text" placeholder="Enter Second Number" name="secondNum" /> <br> <br>
                    <button type="submit">Submit</button>
                </form>

            </body>
            </html>
            `);
        return res.end();
    } else if (req.url.toLowerCase() === '/calculate-result' && req.method === 'POST') {
        return sumHandler(req, res);

    }



    res.setHeader('Content-Type', "text/html");
    res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>404 Page not Found</title>
            </head>
            <body>
                <h1>404 Page not Found</h1>
                <a href="/">Go to calculator</a>
            </body>
            </html>
            `);
    return res.end();



}

export { requestHandler };