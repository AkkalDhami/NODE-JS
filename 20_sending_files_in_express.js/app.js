import path from 'path'
import express from 'express';

const app = express();

app.get("/", (req, res) => {
    console.log(import.meta.dirname);
    console.log(import.meta.url);
    const _filename = new URL(import.meta.url).pathname;
    console.log(_filename);

    const homePath = path.join(import.meta.dirname, "public", "index.html");

    return res.sendFile(homePath);
});

app.get("/about", (req, res) => {
    return res.send("<h1>Welcome to our about page </h1>");
});

app.get("/contact", (req, res) => {
    return res.send("<h1>Welcome to our contact page </h1>");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
