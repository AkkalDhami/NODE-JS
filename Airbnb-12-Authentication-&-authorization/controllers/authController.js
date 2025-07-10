import { check, validationResult } from "express-validator";
import User from "../models/user.js";

import bcrypt from "bcryptjs";

export const getLogin = (req, res) => {
    res.render("auth/login", {
        title: "Login",
        currentPage: "login",
        isLoggedIn: false,
        errors: [],
        email: "",
        password: "",
        user: {}
    });
}

export const getRegister = (req, res) => {
    res.render("auth/register", {
        title: "Register",
        currentPage: "register",
        isLoggedIn: false,
        errors: [],
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "guest",
        terms: "",
        user: {}
    });
}

export const postRegister = [
    check("fname")
        .notEmpty()
        .withMessage("First name is required")
        .trim()
        .matches(/^[a-zA-Z]+$/)
        .withMessage("First name must contain only letters"),

    check("email")
        .isEmail()
        .trim()
        .withMessage("Please enter a valid email address"),

    check("password")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters long")
        .trim()
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage("Password must contain at least one special character"),


    check("confirmPassword")
        .notEmpty()
        .withMessage("Confirm password is required")
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),

    check("role")
        .notEmpty()
        .withMessage("Role is required")
        .isIn(["guest", "host"])
        .withMessage("Role must be either 'guest' or 'host'"),

    check("terms")
        .equals("on")
        .withMessage("You must accept the terms and conditions"),


    (req, res, next) => {
        let { fname, lname, email, password, role, terms } = req.body;
        const errors = validationResult(req);
        console.log("Errors: ", errors.array());
        console.log("Request Body: ", req.body);

        if (!errors.isEmpty()) {
            return res.render("auth/register", {
                title: "Register",
                currentPage: "register",
                isLoggedIn: false,
                errors: errors.array().map(error => error.msg),
                fname,
                lname,
                email,
                password,
                role,
                terms: terms === "on" ? true : false
            });
        }

        bcrypt.hash(password, 12)
            .then(hashedPassword => {
                const user = User({
                    fname,
                    lname,
                    email,
                    password: hashedPassword,
                    role,
                    terms: terms === "on" ? true : false
                });
                return user.save();
            })
            .then(() => {
                console.log("User registered successfully");
                res.redirect("/auth/login");
            })
            .catch(err => {
                return res.render("auth/register", {
                    title: "Register",
                    currentPage: "register",
                    isLoggedIn: false,
                    errors: [err.message],
                    fname,
                    lname,
                    email,
                    password,
                    role,
                    terms: terms === "on" ? true : false
                });
            });

    }
]

export const postLogin = async (req, res) => {
    let { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(422).render("auth/login", {
            title: "Login",
            currentPage: "login",
            isLoggedIn: false,
            errors: ["Invalid email or password"],
            email,
            user: {}
        });
    }
    console.log("User found: ", user);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(422).render("auth/login", {
            title: "Login",
            currentPage: "login",
            isLoggedIn: false,
            errors: ["Invalid email or password"],
            email,
            user: {}
        });
    }

    req.session.isLoggedIn = true;
    req.session.user = user;
    await req.session.save();
    res.redirect("/");
}

export const postLogout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log("Error destroying session: ", err);
        }
        res.redirect("/auth/login");
    });
}