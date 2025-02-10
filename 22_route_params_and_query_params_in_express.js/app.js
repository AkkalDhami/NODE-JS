import path from 'path'
import express from 'express';

const app = express();

const response = await fetch('https:jsonplaceholder.typicode.com/todos/1');
const data = await response.json();
console.log(data);

// console.log(__dirname);
// console.log(__filename);

console.log(import.meta.dirname);
console.log(import.meta.filename);

const staticPath = path.join(import.meta.dirname, "public");

app.use("/public", express.static(staticPath));

app.get("/", (req, res) => {
    const homePath = path.join(import.meta.dirname, "public", "index.html");
    return res.sendFile(homePath);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
