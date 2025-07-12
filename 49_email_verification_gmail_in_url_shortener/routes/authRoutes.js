import { Router } from "express";
import { getLogin, getRegister, postLogin, postRegister, getProfile, logout, getVerifyEmail, getResendVerificationLink ,getVerifyEmailToken} from "../controllers/authController.js";

const router = Router();

router.get('/register', getRegister);
router.get('/login', getLogin);
router.get('/profile', getProfile);
router.get('/logout', logout);
router.get('/verify-email', getVerifyEmail);
router.get('/verify-email-token', getVerifyEmailToken);


router.post('/login', postLogin);
router.post('/register', postRegister);
router.post('/resend-verification-link', getResendVerificationLink);

export const authRoutes = router;