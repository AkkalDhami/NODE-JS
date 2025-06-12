import path from 'path'

import express from 'express'

import { storeRouter } from './routes/storeRouter.js'
import { hostRouter } from './routes/hostRouter.js'

import { pageNotFound } from './controllers/error.js'
import { mongoConnect } from './utils/databaseUtils.js'
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(storeRouter);
app.use("/host", hostRouter);


const staticPath = path.join(import.meta.dirname, "public");
app.use(express.static(staticPath));

app.set("view engine", "ejs");
app.set("views", "views");

// handle 404 error 
app.use(pageNotFound);

mongoConnect(client => {
  console.log("client", client);
  const PORT = 3002;
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
});
