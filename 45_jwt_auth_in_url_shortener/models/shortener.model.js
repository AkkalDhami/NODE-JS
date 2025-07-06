import { db } from "../config/db.js";
import { shortLinksTable } from "../drizzle/schema.js";
import { eq } from 'drizzle-orm';
export const loadLinks = async () => {
    return await db.select().from(shortLinksTable);
};

export const saveLinks = async (links) => {
    return await db.insert(shortLinksTable).values({
        shortCode: links.shortCode,
        url: links.url
    });
};

export const getLinkByShortCode = async (shortCode) => {
    const [link] = await db.select().from(shortLinksTable).where(eq(shortLinksTable.shortCode,shortCode));
    return link;
};

export const deleteLink = async (shortCode) => {
    await db.delete(shortLinksTable).where(eq(shortLinksTable.shortCode, shortCode));
};