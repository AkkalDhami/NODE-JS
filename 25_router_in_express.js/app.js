import express from 'express';
const app = express();

// import {router} from './routes/short.routes.js'; // default export

import {shortRoutes} from './routes/short.routes.js'; // named export

// app.use(router);
app.use(shortRoutes);

app.get("/", (req, res) => {
    return res.send(`
        <h1>Welcome to our home page </h1>
        <a href="/contact">Contact</a>
        `);
});

app.use((req, res) => {
    return res.status(404).send(`
        <h1>404 Page Not Found</h1>
        <a href="/">Home</a>
        `);
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});