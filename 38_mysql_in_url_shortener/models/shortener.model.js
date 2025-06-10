import { db } from "../config/db-client.js";

export const loadLinks = async () => {
    const [links] = await db.execute("SELECT * FROM shortLink");
    return links;
};

export const saveLinks = async (links) => {
    return await db.execute("INSERT INTO shortLink (url, short_code) VALUES (?, ?)", [links.url, links.short_code]);
};

export const getLinkByShortCode = async (shortCode) => {
    const [link] = await db.execute("SELECT * FROM shortLink WHERE short_code = ?", [shortCode]);
    return link;
};

export const deleteLink = async (shortCode) => {
    return await db.execute("DELETE FROM shortLink WHERE short_code = ?", [shortCode]);
};