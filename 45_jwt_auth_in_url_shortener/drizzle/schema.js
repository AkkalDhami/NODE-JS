import { mysqlTable, serial, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const shortLinksTable = mysqlTable('short_links', {
    id: serial().primaryKey(),
    shortCode: varchar("short_code", { length: 25 }).notNull().unique(),
    url: varchar({ length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const usersTable = mysqlTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});
