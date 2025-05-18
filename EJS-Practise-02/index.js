import e from "express";
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

app.get("/edit/:filename", (req, res) => {
    res.render("edit", { title: req.params.filename });
});

app.get("/delete/:filename", (req, res) => {
    res.render("delete", { title: req.params.filename });
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

app.post("/edit", (req, res) => {
    fs.rename(`./files/${req.body.title}`, `./files/${req.body.newFilename}.txt`, (err) => {
        if (err) {
            console.log(err);
        } else {
            fs.writeFile(`./files/${req.body.newFilename}.txt`, req.body.newDescription, (err) => {
                if (err) {
                    console.log(err);
                }
            })
            res.redirect("/");
        }
    })
});

app.post("/delete", (req, res) => {
    fs.unlink(`./files/${req.body.deleteFilename}`, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

const port = 3000;

app.listen(port, () => {
    console.log("Example app listening on port http://localhost:3000");
});