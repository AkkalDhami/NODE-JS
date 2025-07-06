

import { createUser, getUserByEmail, hashedPassword, generateToken, verifyPassword } from "../services/authService.js";

export const getRegister = (req, res) => {
    res.render('auth/register', { title: 'Register' });
}

export const getLogin = (req, res) => {
    res.render('auth/login', { title: 'Login' });
}

export const getProfile = (req, res) => {
    if (!req.user) return res.redirect('/auth/login');
    res.render('auth/profile', { title: 'Profile', user: req.user });
}

export const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
}

export const postLogin = async (req, res) => {
    if (req.user) return res.redirect('/');
    const { email, password, remember } = req.body;

    if (!email || !password) {
        console.log('Email or password is missing');
        return res.redirect('/login');
    }

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            console.log('User not found');
            return res.redirect('/login');
        }

        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.redirect('/login');
        }

        const token = generateToken({
            id: user.id,
            email: user.email,
            name: user.name
        });

        res.cookie('token', token);

    } catch (error) {
        console.error('Error during login:', error);
        return res.redirect('/login');
    }
    res.redirect('/');
}

export const postRegister = async (req, res) => {
    if (req.user) return res.redirect('/');
    const { name, email, password, confirmPassword } = req.body;

    try {
        const userExists = await getUserByEmail(email);
        if (userExists) {
            console.log('User already exists:', userExists);
            return res.redirect('/auth/register');
        }

        const hashedPasswd = await hashedPassword(password);
        const user = await createUser({ name, email, password: hashedPasswd });

    } catch (error) {
        console.error('Error during registration:', error);
        return res.redirect('/auth/register');
    }
    res.redirect('/auth/login');
}