import { Note } from '../models/notes.js'
export const createNotes = (req, res) => {
    res.render("index", {
        currentPage: "index"
    });
}

export const getAllNotes = async (req, res) => {
    res.render("my-notes", {
        notes: await Note.find(),
        currentPage: "my-notes"
    });
}
export const editNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).send("Note not found");
        res.render("edit-note", { note, currentPage: 'edit-note' });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

export const deleteNote = async (req, res) => {
    try {
        let id = req.params.id;
        console.log(id)
        await Note.findOneAndDelete({ _id: id });
        res.redirect("/my-notes");

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }

}
export const createNote = async (req, res) => {
    console.log(req.body);
    const { title, content } = req.body;

    await Note.create({
        title,
        content
    });
    res.redirect("/my-notes");
}
export const updateNote = async (req, res) => {
    let id = req.params.id
    const { title, content } = req.body;
    await Note.findOneAndUpdate({ _id: id }, { title, content }, { new: true });
    res.redirect("/my-notes");
}
