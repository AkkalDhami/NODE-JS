import express from "express";
import { Url } from "../models/url.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const allUrls = await Url.find({});
    console.log(allUrls);
    res.render("url", {
        title: "URL Shortener",
        urls: allUrls
    });
});


export const staticRouter = router;