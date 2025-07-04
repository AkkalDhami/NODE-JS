import { Router } from "express";
import { postURLShortener, getShortenerPage, reDirectToShortLinks, deleteShortLink } from "../controllers/postURLController.js";
const router = Router();


router.post('/shorten', postURLShortener);
router.get('/url', getShortenerPage);
router.get("/:shortCode", reDirectToShortLinks);
router.get("/delete/:shortCode", deleteShortLink);

export const shortnerRoutes = router;