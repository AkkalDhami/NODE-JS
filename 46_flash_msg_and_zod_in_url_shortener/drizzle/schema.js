import { relations } from 'drizzle-orm';
import { mysqlTable, int, serial, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const shortLinksTable = mysqlTable('short_links', {
    id: serial().primaryKey(),
    shortCode: varchar("short_code", { length: 25 }).notNull().unique(),
    url: varchar({ length: 255 }).notNull(),
    totalClicks: int('total_clicks').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
    userId: int('user_id').notNull().references(() => usersTable.id),
});

export const usersTable = mysqlTable('users', {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

// a user can have many short links
export const usersRelation = relations(usersTable, ({ many }) => ({
    shortLink: many(shortLinksTable),
}));

// a short link belongs to a user
export const shortLinksRelation = relations(shortLinksTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [shortLinksTable.userId],
        references: [usersTable.id],
    })
}));