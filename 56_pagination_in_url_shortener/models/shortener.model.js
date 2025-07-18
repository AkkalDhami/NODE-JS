
import { db } from "../config/db.js";
import { shortLinksTable } from "../drizzle/schema.js";
import { desc, eq, sql, count } from 'drizzle-orm';


export const loadLinks = async ({ userId, limit = 10, offset = 0 }) => {
    const condition = eq(shortLinksTable.userId, userId);
    const links = await db
        .select()
        .from(shortLinksTable)
        .where(condition)
        .orderBy(desc(shortLinksTable.createdAt))
        .limit(limit)
        .offset(offset);

    const [{ totalCount }] = await db
        .select({ totalCount: count() })
        .from(shortLinksTable)
        .where(condition);

    return {
        shortLinks: links,
        totalCount
    };
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