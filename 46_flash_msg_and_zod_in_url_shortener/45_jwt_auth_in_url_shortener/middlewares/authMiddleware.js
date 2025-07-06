import { verifyJWTToken } from "../services/authService.js";

export const verifyAuthentication = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        req.user = null;
        return next();
    }
    
    try {
        const decodedToken = verifyJWTToken(token);
        req.user = decodedToken;
        console.log("USER: ", req.user);
    } catch (error) {
        req.user = null;
    }

    next();
};