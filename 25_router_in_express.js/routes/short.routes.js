
//? Express.Router is used to create routes
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    return res.send("<h1>Welcome to our home page </h1>");
});

router.get("/about", (req, res) => {
    return res.send("<h1>Welcome to our about page </h1>");
});

router.get("/contact", (req, res) => {
    return res.send("<h1>Welcome to our contact page </h1>");
});

//* default export
// export default router;

//* named export
export const shortRoutes = router;
    
