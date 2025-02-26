import express from 'express'

import { getHome } from '../controllers/homes.js';

const userRouter = express.Router();

userRouter.get("/", getHome);

export { userRouter };