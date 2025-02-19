import path from 'path'

// External Module
import express from 'express'
const hostRouter = express.Router();

import { rootDir } from '../utils/pathUtils.js';

hostRouter.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir, 'addHome.html'));
})

hostRouter.post("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir, 'homeAdded.html'));
})


export { hostRouter };
