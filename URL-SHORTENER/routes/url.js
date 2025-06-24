import express from "express";
import { postNewUrl, postDeleteUrl } from "../controllers/url.js";
const router = express.Router();

router.post('/shorten', postNewUrl);
router.post('/:shortId/delete', postDeleteUrl);

export const urlRouter = router;
