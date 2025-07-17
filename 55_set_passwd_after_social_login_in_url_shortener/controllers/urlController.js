import crypto from "crypto";
import zod from "zod";
import { loadLinks, saveLinks, getLinkByShortCode, updateTotalCLicks, deleteLinkById } from "../models/shortener.model.js";
import { urlSchema } from "../validators/urlValidators.js";
import { getLinkById, updateLink } from "../services/authService.js";


export const getShortenerPage = async (req, res) => {
    try {
        if (!req.user) return res.redirect('/auth/login')
        const links = await loadLinks(req.user.id)
        return res.render("index", {
            links,
            host: req.hostname,
            title: 'URL Shortener',
            formatDate: (dateString) => {
                const options = { year: 'numeric', month: 'short', day: 'numeric' };
                return new Date(dateString).toLocaleDateString('en-US', options);
            },
            errors: req.flash('errors')
        });
    } catch (error) {
        console.error("Error in getShortenerPage:", error);
        return res.status(500).send("Internal server error");
    }
};

export const getEditPage = async (req, res) => {
    if (!req.user) return res.redirect('/auth/login')

    const { data: id, error } = zod.coerce.number().safeParse(req.params.id);
    if (error) return res.status(404).send("404 error occurred");
    try {
        const link = await getLinkById(id);
        if (!link) return res.status(404).send("404 error occurred");
        return res.render("edit", {
            link,
            host: req.hostname,
            title: 'URL Shortener Edit',
            errors: req.flash('errors')
        });
    } catch (error) {
        console.error("Error in getEditPage:", error);
        return res.status(500).send("Internal server error");
    }
};

export const postURLShortener = async (req, res) => {
    try {
        if (!req.user) return res.redirect('/auth/login');

        const { data, error } = urlSchema.safeParse(req.body);
        if (error) {
            const errors = error.errors[0].message
            req.flash('errors', errors);
            return res.redirect('/');
        }

        const { url, shortCode } = data;
        const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

        const link = await getLinkByShortCode(finalShortCode);

        if (link) {
            req.flash('errors', 'Short code already exists. Please choose another.');
            return res.redirect('/');
        }

        await saveLinks({ url, shortCode: finalShortCode, user_id: req.user.id });

        return res.redirect("/");
    } catch (error) {
        console.error("Error in postURLShortener:", error);
        return res.status(500).send(error.message);
    }
};

export const reDirectToShortLinks = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const link = await getLinkByShortCode(shortCode);

        if (!link) return res.status(404).send("404 error occurred");
        await updateTotalCLicks(shortCode);
        return res.redirect(link.url);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};

export const deleteShortLink = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteLinkById(id);
        return res.redirect("/");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};

export const editShortLink = async (req, res) => {
    try {
        const { id, url, shortCode } = req.body;
        await updateLink(id, url, shortCode);
        return res.redirect("/");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};