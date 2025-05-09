// Core Module
import path from 'path'

// External Module
import express from 'express'

//Local Module
import { userRouter } from './routes/userRouter.js'
import { hostRouter } from './routes/hostRouter.js'
import {rootDir} from './utils/pathUtils.js'


const app = express();
app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);

const staticPath = path.join(import.meta.dirname, "public");

app.use("/public", express.static(staticPath));

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir,  '404.html'));

})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});