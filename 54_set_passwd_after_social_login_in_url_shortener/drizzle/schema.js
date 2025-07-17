import { relations, sql } from 'drizzle-orm';
import {
    mysqlTable,
    boolean,
    text,
    int,
    serial,
    varchar,
    timestamp,
    mysqlEnum
} from 'drizzle-orm/mysql-core';

export const shortLinksTable = mysqlTable('short_links', {
    id: serial().primaryKey(),
    shortCode: varchar("short_code", { length: 25 }).notNull().unique(),
    url: varchar({ length: 255 }).notNull(),
    totalClicks: int('total_clicks').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
    userId: int('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
});

export const sessionsTable = mysqlTable('sessions', {
    id: int().autoincrement().primaryKey(),
    userId: int('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    valid: boolean().notNull().default(true),
    userAgent: text('user_agent'),
    ip: varchar({ length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})

export const oauthAccountsTable = mysqlTable('oauth_accounts', {
    id: int('id').autoincrement().primaryKey(),
    userId: int('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    provider: mysqlEnum('provider', ['github', 'google',]).notNull(),
    providerAccountId: varchar("provider_account_id", { length: 255 }).notNull().unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const passwordResetTokensTable = mysqlTable("password_reset_tokens", {
    id: int("id").autoincrement().primaryKey(),
    userId: int("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" })
        .unique(),
    tokenHash: text("token_hash").notNull(),
    expiresAt: timestamp("expires_at")
        .default(sql`(CURRENT_TIMESTAMP + INTERVAL 1 HOUR)`)
        .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersTable = mysqlTable('users', {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }),
    isEmailValid: boolean('is_email_valid').notNull().default(false),
    avatarUrl: varchar('avatar_url', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export const verifyEmailTokensTable = mysqlTable('verify_email_tokens', {
    id: int('id').autoincrement().primaryKey(),
    token: varchar({ length: 8 }).notNull(),
    userId: int('user_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    expiredAt: timestamp('expired_at').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
})

// a user can have many short links
export const usersRelation = relations(usersTable, ({ many }) => ({
    shortLink: many(shortLinksTable),
    session: many(sessionsTable),
}));

// a short link belongs to a user
export const shortLinksRelation = relations(shortLinksTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [shortLinksTable.userId], // foreign key
        references: [usersTable.id],
    })
}));

// a session belongs to a user
export const sessionsRelation = relations(sessionsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [sessionsTable.userId], // foreign key
        references: [usersTable.id],
    })
}));