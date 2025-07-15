

import { sendEmail } from "../lib/nodemailer.js";
import { autenticateUser, clearUserSession, clearVerifyEmailToken, createUser, createVerifyEmailLink, findUserById, findVerificationEmailToken, generateRandomToken, getAllShortLinksByUserId, getUserByEmail, hashedPassword, insertVerifyEmailToken, sendNewVerifyEmailLink, updatePassword, updateUserName, verifyPassword, verifyUserEmailAndUpdate } from "../services/authService.js";
import { changePasswordSchema, loginSchema, registerSchema, verifyEmailSchema, verifyProfileSchema } from "../validators/authValidators.js";

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
    console.log(user)
    const allShortLinks = await getAllShortLinksByUserId(user.id);
    res.render('auth/profile', {
        title: 'Profile Page',
        user,
        links: allShortLinks
    });
}

export const getEditProfile = async (req, res) => {
    const user = await findUserById(req.params.id);
    if (!user) return res.redirect('/auth/login');
    res.render('auth/edit-profile', {
        title: 'Edit Profile Page',
        user,
        errors: req.flash('errors')
    });
}

export const getChangePasswordPage = (req, res) => {
    res.render('auth/change-password', {
        title: 'Change Password',
        errors: req.flash('errors')
    });
}

export const postEditProfile = async (req, res) => {

    const { data, error } = verifyProfileSchema.safeParse(req.body);

    console.log(data)

    if (error) {
        const errors = error.errors[0].message
        req.flash('errors', errors);
        return res.redirect(`/auth/edit-profile/${req.user.id}`);
    }
    const { name } = data;

    const updatedUser = await findUserById(req.user.id);
    if (!updatedUser) return res.redirect('/auth/login');
    updateUserName(updatedUser.id, name);
    res.redirect('/auth/profile');
}

export const logout = async (req, res) => {
    await clearUserSession(req.user.sessionId);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.redirect('/auth/login');
}

export const getVerifyEmail = (req, res) => {
    if (!req.user || req.user.isEmailValid) return res.redirect('/');
    res.render('auth/verify-email', {
        title: 'Verify Email',
        user: req.user
    });
}

export const getVerifyEmailToken = async (req, res) => {
    const { data, error } = verifyEmailSchema.safeParse(req.query);

    if (error) return res.redirect('/auth/verify-email');

    const token = await findVerificationEmailToken(data);
    console.log("token: ", token);
    if (!token) return res.send('Invalid token');

    await verifyUserEmailAndUpdate(token.email);

    clearVerifyEmailToken(token.email).catch(console.error);

    return res.redirect('/auth/profile');
}

export const getResendVerificationLink = async (req, res) => {
    if (!req.user || req.user.isEmailValid) return res.redirect('/');

    await sendNewVerifyEmailLink({ userId: req.user.id, email: req.user.email }).catch(console.error);
    res.redirect('/auth/verify-email');
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
        await sendNewVerifyEmailLink({ userId: user.id, email }).catch(console.error);
        return res.redirect('/');
    } catch (error) {
        console.error('Error during registration:', error);
        return res.redirect('/auth/register');
    }
}


export const postChangePassword = async (req, res) => {
    const { data, error } = changePasswordSchema.safeParse(req.body);
    if (error) {
        const errors = error.errors[0].message
        req.flash('errors', errors);
        return res.redirect('/auth/change-password');
    }

    const user = await findUserById(req.user.id);
    if (!user) return res.redirect('/auth/login');
    // get current password, new password
    const { currentPassword, newPassword } = data;

    // check if current password is correct
    const isPasswordValid = await verifyPassword(currentPassword, user.password);
    if (!isPasswordValid) {
        req.flash('errors', 'Current password is incorrect');
        return res.redirect('/auth/change-password');
    }

    // update password
    const hashedPasswd = await hashedPassword(newPassword);
    await updatePassword(user.id, hashedPasswd);

    res.redirect('/auth/profile');
}