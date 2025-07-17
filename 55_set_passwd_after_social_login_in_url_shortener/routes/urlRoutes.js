import { Router } from "express";
import { postURLShortener, getShortenerPage, reDirectToShortLinks, deleteShortLink, getEditPage, editShortLink } from "../controllers/urlController.js";
const router = Router();


router.post('/shorten', postURLShortener);
router.get('/', getShortenerPage);
router.get("/:shortCode", reDirectToShortLinks);
router.get("/delete/:id", deleteShortLink);

router.get('/edit/:id', getEditPage)

router.post('/edit', editShortLink);

export const shortnerRoutes = router;