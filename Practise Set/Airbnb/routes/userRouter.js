// Core Module
import path from 'path'

// External Module
import express from 'express'
const userRouter = express.Router();

// Local Module
import { rootDir } from '../utils/pathUtils.js';

userRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir,  'home.html'));
});

export { userRouter };