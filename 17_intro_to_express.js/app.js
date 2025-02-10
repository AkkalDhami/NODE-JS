//! Express.JS: s a minimal and flexible web application framework for Node.js.

//?  It provides a robust set of featuresmfor building single - page, multi page, and hybrid webapplications.

//? Express.js simplifies server - side coding by providing a layer of fundamental web applicationfeatures.

import express from 'express';
const app = express();
app.get("/", (req, res) => {
    return res.send("<h1>Welcome to our home page </h1>");
});
app.get("/about", (req, res) => {
    return res.send("<h1>Welcome to our about page </h1>");
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

