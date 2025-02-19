
import express from 'express'
const userRouter = express.Router();

import { registeredHomes } from '../routes/hostRouter.js';

console.log(registeredHomes)

userRouter.get("/", (req, res, next) => {
  res.render('home')
  console.log("homes: ", registeredHomes)
});

export { userRouter };