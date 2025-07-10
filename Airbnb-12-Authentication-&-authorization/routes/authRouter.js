import express from 'express';
import { getLogin, getRegister, postLogin, postLogout, postRegister } from '../controllers/authController.js';
const authRouter = express.Router();

authRouter.get("/signup", (req, res) => {
    res.render("login");
});
authRouter.get("/login", getLogin);
authRouter.get("/register", getRegister);

authRouter.post("/register", postRegister);
authRouter.post("/login", postLogin);
authRouter.post("/logout", postLogout);
export { authRouter };