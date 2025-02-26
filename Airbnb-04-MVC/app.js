import path from 'path'

import express from 'express'

import { userRouter } from './routes/userRouter.js'
import { hostRouter } from './routes/hostRouter.js'
import { rootDir } from './utils/pathUtils.js'

import { pageNotFound } from './controllers/error.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use("/host", hostRouter);


const staticPath = path.join(import.meta.dirname, "public");
app.use(express.static(staticPath));

app.set("view engine", "ejs");
app.set("views", "views");

// handle 404 error 
app.use(pageNotFound);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});