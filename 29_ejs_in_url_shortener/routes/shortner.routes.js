import { Router } from "express";
import { postURLShortener, getShortenerPage, reDirectToShortLinks } from "../controllers/postURLShortens.controller.js";
const router = Router();


router.post('/', postURLShortener);
router.get('/', getShortenerPage);

router.get("/:shortCode", reDirectToShortLinks);

export const shortnerRoutes = router;