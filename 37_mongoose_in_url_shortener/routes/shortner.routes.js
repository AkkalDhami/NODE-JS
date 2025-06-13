import { Router } from "express";
import { postURLShortener, getShortenerPage, reDirectToShortLinks,deleteShortLink } from "../controllers/postURLShortens.controller.js";
const router = Router();


router.post('/', postURLShortener);
router.get('/', getShortenerPage);

router.get("/:shortCode", reDirectToShortLinks);
router.get("/delete/:shortCode", deleteShortLink);

export const shortnerRoutes = router;