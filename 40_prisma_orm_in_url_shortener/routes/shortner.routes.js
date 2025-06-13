import { Router } from "express";
import { postURLShortener, getShortenerPage, reDirectToShortLinks, deleteLink } from "../controllers/postURLShortens.controller.js";
const router = Router();


router.post('/', postURLShortener);
router.get('/', getShortenerPage);

router.get("/:shortCode", reDirectToShortLinks);
router.get("/delete/:shortCode", deleteLink);

export const shortnerRoutes = router;