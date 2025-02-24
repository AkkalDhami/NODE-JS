import express from "express";
import fs from "fs";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static("public"));

app.get("/", (req, res) => {

    fs.readdir("./files", (err, files) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { files });
            console.log(files);
        }
    });
});

app.get("/file/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("filename ", req.params.filename);
            res.render("file", { filename: req.params.filename, filedata: data });
        }
    });
});

app.post("/create", (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.description, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
    console.log(req.body);
});

const port = 3000;

app.listen(port, () => {
    console.log("Example app listening on port http://localhost:3000");
});