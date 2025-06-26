import { mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

export const shortLinksTable = mysqlTable('shortLinks', {
    id: serial().primaryKey(),
    shortCode: varchar({ length: 25 }).notNull().unique(),
    url: varchar({ length: 255 }).notNull(),
});
