import { getAddHome, postAddHome, getHostHomes } from '../controllers/hostController.js';
import express from 'express'
const hostRouter = express.Router();

hostRouter.get("/add-home", getAddHome)

hostRouter.post("/add-home", postAddHome)
hostRouter.get("/host-home-list", getHostHomes)

export { hostRouter };
