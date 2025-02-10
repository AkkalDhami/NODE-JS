
import express from 'express';

const app = express();

app.get("/", (req, res) => {
    return res.send("<h1>Welcome to our home page </h1>");
});

app.get("/profile/:username", (req, res) => {
    const username = req.params.username;
    // console.log(username);
    return res.send(`<h1>Welcome to our profile page ${username} </h1>`);
});

app.get("/profile/:username/article/:slug", (req, res) => {
    const username = req.params.username;
    const formattedURL = req.params.slug.replace(/-/g, " ");
    return res.send(`
       <h1>Welcome to our article page ${req.params.slug} ${formattedURL} </h1>
        `);
});


app.get("/product", (req, res) => {
    console.log(req.query.search)
    return res.send(`
        <h1>Welcome to our product page </h1>
        <p> ${req.query.search} pageno: ${req.query.page} limit: ${req.query.limit} </p>
        `);
});


const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
