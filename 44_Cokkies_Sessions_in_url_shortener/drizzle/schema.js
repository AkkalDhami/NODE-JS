import { sql } from 'drizzle-orm';
import { mysqlTable, serial, varchar, datetime } from 'drizzle-orm/mysql-core';

export const shortLinksTable = mysqlTable('shortLinks', {
    id: serial().primaryKey(),
    shortCode: varchar("short_code", { length: 25 }).notNull().unique(),
    url: varchar({ length: 255 }).notNull(),
    createdAt: datetime('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const usersTable = mysqlTable('users', {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    createdAt: datetime('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: datetime('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});
