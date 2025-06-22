import express from "express";
import { noteRouter } from "./routes/noteRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "views");

console.log(noteRouter)

app.use(noteRouter);


app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
