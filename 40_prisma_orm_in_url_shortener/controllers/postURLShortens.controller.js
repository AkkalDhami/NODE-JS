import crypto from "crypto";
import { loadLinks, saveLinks, getLinkByShortCode, deleteURL } from "../models/shortener.model.js";
export const getShortenerPage = async (req, res) => {
    try {
        const links = await loadLinks();
        return res.render("index", { links, host: req.hostname });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
};

export const postURLShortener = async (req, res) => {
    try {
        const { url, shortCode } = req.body;
        const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

        const links = await loadLinks();

        const linkExists = links.filter((link) => link.shortCode === finalShortCode).length > 0;

        if (linkExists) return res.status(400).send("Short code already exists");


        await saveLinks({ url, shortCode });
        return res.redirect("/");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
};

export const reDirectToShortLinks = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const link = await getLinkByShortCode(shortCode);

        if (!link) return res.status(404).send("404 error occurred");

        return res.redirect(link.url);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};
export const deleteLink = async (req, res) => {
    try {
        const { shortCode } = req.params;
        await deleteURL(shortCode);
        return res.redirect("/");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
}