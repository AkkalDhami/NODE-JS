import { db } from "../config/db.js";
import { shortLinksTable } from "../drizzle/schema.js";
import { eq, sql } from 'drizzle-orm';
export const loadLinks = async (userId) => {
    return await db.select().from(shortLinksTable).where(eq(shortLinksTable.userId, userId));
};

export const saveLinks = async (links) => {
    return await db.insert(shortLinksTable).values({
        shortCode: links.shortCode,
        url: links.url,
        userId: links.user_id
    });
};

export const getLinkByShortCode = async (shortCode) => {
    const [link] = await db.select().from(shortLinksTable).where(eq(shortLinksTable.shortCode, shortCode));
    return link;
};

export const deleteLinkById = async (id) => {
    await db.delete(shortLinksTable).where(eq(shortLinksTable.id, id));
};

export const updateTotalCLicks = async (shortCode) => {
    await db.update(shortLinksTable).set({
        totalClicks: sql`${shortLinksTable.totalClicks} + 1`
    }).where(eq(shortLinksTable.shortCode, shortCode));
};