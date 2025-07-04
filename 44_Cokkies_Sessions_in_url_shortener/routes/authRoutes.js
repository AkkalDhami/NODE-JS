import { Router } from "express";
import { getLogin, getRegister, postLogin, postRegister } from "../controllers/auth.js";

const router = Router();

router.get('/register', getRegister);
router.get('/login', getLogin);

router.post('/login', postLogin);
router.post('/register', postRegister);

export const authRoutes = router;