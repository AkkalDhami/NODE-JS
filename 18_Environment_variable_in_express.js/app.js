//? Environment variables are used to store configuration values like port number, API keys, database URLs, or secrets outside the codebase.

//? Most platforms automatically add PORT environment variable which we can use.

// console.log(process.env);

import express from 'express';
import { PORT } from './port.js';

const app = express();

app.get("/", (req, res) => {
    return res.send("<h1>Welcome to our home page </h1>");
});

// const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
