import { date, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';
export const notesTable = mysqlTable('notes_table', {
    id: serial().primaryKey(),
    title: varchar({ length: 100 }).notNull(),
    content: varchar({ length: 250 }).notNull(),
    createdAt: date().default(),
});