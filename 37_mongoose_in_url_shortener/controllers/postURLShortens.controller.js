import crypto from "crypto";
import { Url } from "../schema/urlSchema.js";


export const getShortenerPage = async (req, res) => {
    try {
        const links = await Url.find();
        return res.render("index", { links, host: req.host });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
};

export const postURLShortener = async (req, res) => {
    try {
        const { url, shortCode } = req.body;
        const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

        const links = await Url.find();

        if (links[finalShortCode]) {
            return res
                .status(400)
                .send("Short code already exists. Please choose another.");
        }

        await Url.create({
            url,
            shortCode
        });

        return res.redirect("/");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
};

export const reDirectToShortLinks = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const link = await Url.findOne({ shortCode });

        if (!link) return res.status(404).send("404 error occurred");

        return res.redirect(link.url);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};