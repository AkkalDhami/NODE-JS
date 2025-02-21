
import path from 'path'
import express from 'express'
import { rootDir } from '../utils/pathUtils.js'
const contactRouter = express.Router();

contactRouter.get("/contact", (req, res, next) => {
    res.sendFile(path.join(rootDir, "contact.html"));
});

contactRouter.post("/contact", (req, res, next) => {
    console.log("hello from us");
    console.log(req.body);
    res.sendFile(path.join(rootDir, "contact-success.html"));
})

export { contactRouter };