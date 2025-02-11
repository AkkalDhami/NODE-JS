import express from 'express';
import path from 'path';
const app = express();

const staticPath = path.join(import.meta.dirname, "public");

app.use(express.urlencoded({ extended: true }));
app.use("/contact", express.static(staticPath));

app.get("/", (req, res) => {
    return res.send(`
        <h1>Welcome to our home page </h1>
        <a href="/contact">Contact</a>
        `);
});

app.post("/contact-msg", (req, res) => {
    console.log(req.body);
    return res.send(`
        <h1>thank you ${req.body.name} for your message</h1>
        <a href="/">Home</a>
        `);
})


app.use((req, res) => {
    return res.status(404).sendFile(path.join(import.meta.dirname, "views", "404.html"));
})

// app.use((req, res) => {
//     return res.status(404).send(`
//         <h1>404 Page Not Found</h1>
//         <a href="/">Home</a>
//         `);
// })

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});