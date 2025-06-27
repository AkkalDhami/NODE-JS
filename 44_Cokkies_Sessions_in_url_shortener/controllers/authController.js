import { createUser, getUserByEmail } from '../services/authService.js';

export const getRegister = (req, res) => {
    res.render('../views/auth/register', { title: 'Register' });
}

export const getLogin = (req, res) => {
    res.render('../views/auth/login', { title: 'Login' });
}

export const postLogin = (req, res) => {
    const { email, password, remember } = req.body;
    console.log(req.body);

    if (!email || !password) {
        console.log('Email or password is missing');
        return res.redirect('/login');
    }

    try {
        const user = getUserByEmail(email);
        if (!user) {
            console.log('User not found');
            return res.redirect('/login');
        }
        if (user.password !== password) {
            console.log('Incorrect password');
            return res.redirect('/login');
        }

        // const cookieOptions = remember ? { maxAge: 30 * 24 * 60 * 60 * 1000 } : {};
        // res.cookie('isLoggedIn', 'true', { ...cookieOptions, path: '/' });

        console.log('User logged in successfully:', user);

    } catch (error) {
        console.error('Error during login:', error);
        return res.redirect('/login');
    }

    res.setHeader('Set-Cookie', "isLoggedIn=true; path=/;");
    res.redirect('/');
}

export const postRegister = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    console.log(req.body);

    const userExists = await getUserByEmail(email);
    if (userExists) {
        console.log('User already exists:', userExists);
        return res.redirect('/register');
    }

    const user = await createUser(name, email, password);
    console.log(user);
    res.redirect('/');
}
