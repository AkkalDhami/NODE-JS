import { db } from '../config/notes-config.js'

export const getNotes = async () => {
    return db.execute("SELECT * FROM notes");
}

export const getNoteById = async (id) => {
    return db.execute("SELECT * FROM notes WHERE id = ?", [id]);
}

export const saveNotes = async (title, content) => {
    return db.execute("INSERT INTO notes (title, content, createdAt) VALUES (?, ?, ?)", [title, content, new Date()]);
}

export const deleteNoteById = async (id) => {
    return db.execute("DELETE FROM notes WHERE id = ?", [id]);
}

export const updateNoteById = async (id, title, content) => {
    return db.execute("UPDATE notes SET title = ?, content = ? WHERE id = ?", [title, content, id]);
}
