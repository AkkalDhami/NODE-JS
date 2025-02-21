
import express from 'express'
const userRouter = express.Router();

import { registeredHomes } from '../routes/hostRouter.js';

userRouter.get("/", (req, res, next) => {
  res.render('home', { registeredHomes: registeredHomes, title: 'Airbnb Home' });
  console.log({ registeredHomes })
});

export { userRouter };