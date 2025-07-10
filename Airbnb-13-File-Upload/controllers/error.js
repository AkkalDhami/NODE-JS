export const pageNotFound = (req, res, next) => {
    res.status(404).render("404", {
        title: "Page Not Found",
        currentPage: '404',
        isLoggedIn: req.isLoggedIn || false,
        errors: ["Page not found"],
        user: req.session.user
    });
}