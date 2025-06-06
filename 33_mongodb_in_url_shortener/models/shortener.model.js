import { dbClient } from "../config/db-client.js";
import { env } from "../config/env.js";
const db = dbClient.db('url_shortener');
const shortenerCollections = db.collection("shortener");

export const loadLinks = async () => {
    return await shortenerCollections.find().toArray();
};

export const saveLinks = async (links) => {
    return await shortenerCollections.insertOne(links);
};
export const getLinkByShortCode = async (shortCode) => {
    return await shortenerCollections.findOne({ shortCode: shortCode });
};