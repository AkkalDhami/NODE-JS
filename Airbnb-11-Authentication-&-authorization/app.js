import path from 'path'
import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import connectMongoDBSession from 'connect-mongodb-session';

import { storeRouter } from './routes/storeRouter.js'
import { hostRouter } from './routes/hostRouter.js'
import { authRouter } from './routes/authRouter.js'
import { pageNotFound } from './controllers/error.js'
const MONGO_URI = "mongodb://127.0.0.1:27017/airbnb";

const MongoDBStore = connectMongoDBSession(session);
const app = express();

const store = new MongoDBStore({
  uri: MONGO_URI,
  collection: 'sessions'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "#secret",
  resave: false,
  saveUninitialized: true,
  store: store,
}));

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  next();
});

app.use(storeRouter);
app.use('/host', (req, res, next) => {
  if (!req.isLoggedIn) {
    return res.redirect('/auth/login');
  }
  next();
})

app.use("/host", hostRouter);
app.use("/auth", authRouter);


const staticPath = path.join(import.meta.dirname, "public");
app.use(express.static(staticPath));

app.set("view engine", "ejs");
app.set("views", "views");

// handle 404 error 
app.use(pageNotFound);




mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to database!");
    const PORT = 4002;
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.log("Error connecting to database: ", err);
  });