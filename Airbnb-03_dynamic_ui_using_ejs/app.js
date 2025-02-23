
import path from 'path'

import express from 'express'

import { userRouter } from './routes/userRouter.js'
import { hostRouter } from './routes/hostRouter.js'
import { rootDir } from './utils/pathUtils.js'


const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use("/host", hostRouter);


const staticPath = path.join(import.meta.dirname, "public");
app.use(express.static(staticPath));

app.set("view engine", "ejs");
app.set("views", "views");


app.use((req, res, next) => {
  res.status(404).render("404", { title: "Page Not Found" });
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});