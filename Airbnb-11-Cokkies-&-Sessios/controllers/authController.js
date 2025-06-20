export const getLogin = (req, res) => {
    res.render("auth/login", {
        title: "Login",
        currentPage: "login",
        isLoggedIn: false
    });
}

export const getRegister = (req, res) => {
    res.render("auth/register", {
        title: "Register",
        currentPage: "register",
        // isLoggedIn: req.isLoggedIn
    });
}

export const postLogin = (req, res) => {
    let { email, password } = req.body;
    console.log(email, password);
    req.session.isLoggedIn = true;
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