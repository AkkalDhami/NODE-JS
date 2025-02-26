import { getAddHome, postAddHome } from '../controllers/homes.js';
import express from 'express'
const hostRouter = express.Router();

hostRouter.get("/add-home", getAddHome)

hostRouter.post("/add-home", postAddHome)

export { hostRouter };
