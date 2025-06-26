import { getNotes, saveNotes, deleteNoteById, updateNoteById, getNoteById } from '../models/notes.js'

export const createNotes = (req, res) => {
    res.render("index", {
        currentPage: "index"
    });
}

export const getAllNotes = async (req, res) => {
    const notes = await getNotes();
    res.render("my-notes", {
        notes: notes,
        currentPage: "my-notes"
    });
}

export const editNote = async (req, res) => {
    try {
        const [note] = await getNoteById(req.params.id);

        console.log("note4: ", [note]);

        if (!note) return res.status(404).send("Note not found");
        res.render("edit-note", {
            note: note,
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
        await deleteNoteById(id);
        res.redirect("/my-notes");

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }

}

export const createNote = async (req, res) => {
    const { title, content } = req.body;
    console.log("title: ", title, "content: ", content)
    await saveNotes(title, content);
    res.redirect("/my-notes");
}

export const updateNote = async (req, res) => {
    let id = req.params.id
    const { title, content } = req.body;
    const note = await updateNoteById(id, title, content);
    console.log("updated note: ", note)
    res.redirect("/my-notes");
}

