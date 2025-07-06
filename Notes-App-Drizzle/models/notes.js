import { eq } from 'drizzle-orm';
import { db } from '../config/db.js';
import { notesTable } from '../drizzle/schema.js';

export const getNotes = async () => {
    return db.select().from(notesTable);
}

export const getNoteById = async (id) => {
    return await db.select().from(notesTable).where({ id: id });
}

export const saveNotes = async (title, content) => {
    return await db.insert(notesTable).values({
        title: title,
        content: content,
        createdAt: new Date(),
    });
}

export const deleteNoteById = async (id) => {
    return await db.delete(notesTable).where({ id: id });
}

export const updateNoteById = async (id, title, content) => {
    return await db.update(notesTable).set({
        title: title,
        content: content,
    }).where(eq(notesTable.id, id));
}
