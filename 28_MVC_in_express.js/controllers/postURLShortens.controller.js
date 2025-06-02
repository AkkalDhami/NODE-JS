import crypto from "crypto";
import path from "path";
import { readFile } from "fs/promises";
import { loadLinks, saveLinks } from "../models/shortener.model.js";

export const postURLShortener = async (req, res) => {
    try {
        const { url, shortCode } = req.body;

        const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

        const links = await loadLinks();

        if (links[finalShortCode]) {
            return res.status(400).send("Short code already exists. Please choose another.");
        }
        links[finalShortCode] = url;

        await saveLinks(links);

        return res.redirect("/");


    } catch (error) {
        console.error(error);
    }
}
export const getShortenerPage = async (req, res) => {
    try {

        const file = await readFile(path.join("views", "index.html"), "utf-8");
        const links = await loadLinks();

        const content = file.toString().replaceAll(
            "{{ shortendedUrls }}",
            Object.entries(links)
                .map(
                    ([shortCode, url]) =>
                        `<li><a href="/${shortCode}" target="_blank">${req.host}/${shortCode}</a> - ${url}</li>`
                )
                .join("")
        );

        return res.send(content);


    } catch (error) {
        console.error(error);
    }
}
export const reDirectToShortLinks = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const links = await loadLinks();

        if (links[shortCode]) {
            return res.redirect(links[shortCode]);
        } else {
            return res.status(404).send("Short code not found");
        }
    } catch (error) {
        console.error(error);
    }
}