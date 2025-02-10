
import express from 'express';

const app = express();

app.get("/", (req, res) => {
    return res.send("<h1>Welcome to our home page </h1>");
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
