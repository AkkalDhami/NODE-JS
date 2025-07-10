

import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../config/constants.js";
import { autenticateUser, clearUserSession, createSession, createUser, findUserById, generateAccessToken, generateRefreshToken, getAllShortLinksByUserId, getUserByEmail, hashedPassword, verifyPassword } from "../services/authService.js";
import { loginSchema, registerSchema } from "../validators/authValidators.js";

export const getRegister = (req, res) => {
    res.render('auth/register', {
        title: 'Register',
        errors: req.flash('errors')
    });
}

export const getLogin = (req, res) => {
    res.render('auth/login', {
        title: 'Login',
        errors: req.flash('errors')
    });
}

export const getProfile = async (req, res) => {
    if (!req.user) return res.redirect('/auth/login');
    const user = await findUserById(req.user.id);
    if (!user) return res.redirect('/auth/login');
    const allShortLinks = await getAllShortLinksByUserId(user.id);
    res.render('auth/profile', {
        title: 'Profile',
        user,
        links: allShortLinks
    });
}

export const logout = async (req, res) => {
    await clearUserSession(req.user.sessionId);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.redirect('/auth/login');
}

export const postLogin = async (req, res) => {
    if (req.user) return res.redirect('/');
    const { data, error } = loginSchema.safeParse(req.body);
    if (error) {
        const errors = error.errors[0].message
        req.flash('errors', errors);
        return res.redirect('/auth/login');
    }
    const { email, password } = data;

    try {
        if (!email || !password) {
            req.flash('errors', 'Email or password is missing');
            return res.redirect('/auth/login');
        }
        const user = await getUserByEmail(email);
        if (!user) {
            req.flash('errors', 'Invalid Credentials');
            return res.redirect('/auth/login');
        }

        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            req.flash('errors', 'Invalid Credentials');
            return res.redirect('/auth/login');
        }

        await autenticateUser({ req, res, user });

    } catch (error) {
        console.error('Error during login:', error);
        return res.redirect('/auth/login');
    }
    res.redirect('/');
}

export const postRegister = async (req, res) => {
    if (req.user) return res.redirect('/');
    const { data, error } = registerSchema.safeParse(req.body);
    if (error) {
        const errors = error.errors[0].message
        req.flash('errors', errors);
        return res.redirect('/auth/register');
    }
    const { name, email, password } = data;
    try {
        const userExists = await getUserByEmail(email);
        if (userExists) {
            req.flash('errors', 'User already exists');
            return res.redirect('/auth/register');
        }

        const hashedPasswd = await hashedPassword(password);
        const [user] = await createUser({ name, email, password: hashedPasswd });
        await autenticateUser({ req, res, user });
        return res.redirect('/');
    } catch (error) {
        console.error('Error during registration:', error);
        return res.redirect('/auth/register');
    }
    // res.redirect('/auth/login');
}