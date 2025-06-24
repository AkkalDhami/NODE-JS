import { getNotes, saveNotes, deleteNoteById, updateNoteById, getNoteById } from '../models/notes.js'

export const createNotes = (req, res) => {
    res.render("index", {
        currentPage: "index"
    });
}

export const getAllNotes = async (req, res) => {
    const notes = await getNotes();
    console.log("notes: ", notes[0])
    res.render("my-notes", {
        notes: await notes[0],
        currentPage: "my-notes"
    });
}

export const editNote = async (req, res) => {
    try {
        const [note] = await getNoteById(req.params.id);
        console.log("note: ", note[0])
        if (!note) return res.status(404).send("Note not found");
        res.render("edit-note", {
            note: note[0],
            currentPage: 'edit-note'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

export const deleteNote = async (req, res) => {
    try {
        let id = req.params.id;
        console.log(id)
        await deleteNoteById(id);
        res.redirect("/my-notes");

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }

}

export const createNote = (req, res) => {
    const { title, content } = req.body;
    saveNotes(title, content);
    res.redirect("/my-notes");
}

export const updateNote = async (req, res) => {
    let id = req.params.id
    const { title, content } = req.body;
    const note = await updateNoteById(id, title, content);
    console.log("updated note: ", note[0])
    res.redirect("/my-notes");
}
