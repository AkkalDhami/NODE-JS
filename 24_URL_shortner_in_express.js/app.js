import express from "express";
import path from "path";
import fs from "fs";

const app = express();
const DATA_FILE = path.join(import.meta.dirname, "data", "data.json");

app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const file = await fs.readFile(
            path.join(import.meta.dirname, "views", "index.html")
        );
        const links = await loadLinks();
    } catch (error) {
        console.log(error);
    }
});

app.post("/", async (req, res) => { });

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
