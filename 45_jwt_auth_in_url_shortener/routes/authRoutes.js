import { Router } from "express";
import { getLogin, getRegister, postLogin, postRegister, getProfile, logout } from "../controllers/authController.js";

const router = Router();

router.get('/register', getRegister);
router.get('/login', getLogin);
router.get('/profile', getProfile);
router.get('/logout', logout);

router.post('/login', postLogin);
router.post('/register', postRegister);

export const authRoutes = router;