import path from 'path'
import express from 'express';

const app = express();


//* absolute path: C:\Users\Aavash\Desktop\20_sending_files_in_express copy\public\index.html

//* relative path: public\index.html

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
