export const sumHandler = (req, res) => {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
        const bodyStr = Buffer.concat(body).toString();
        const params = new URLSearchParams(bodyStr)
        const bodyObj = Object.fromEntries(params);
        const result = Number(bodyObj.firstNum) + Number(bodyObj.secondNum);
        res.setHeader('Content-Type', "text/html");
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>Calculator</title>
            </head>
            <body>
                <h1>Sum : ${result}</h1>
            </body>
            </html>
            `);
    });
}
