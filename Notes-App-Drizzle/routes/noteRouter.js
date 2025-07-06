import express from 'express'

import { createNotes, getAllNotes, editNote, deleteNote, createNote, updateNote } from '../controllers/notesController.js'
const noteRouter = express.Router();


noteRouter.get("/", createNotes);

noteRouter.get("/my-notes", getAllNotes);

noteRouter.get("/edit-note/:id", editNote)

noteRouter.get("/delete-note/:id", deleteNote);

noteRouter.post("/create", createNote);

noteRouter.post("/update-note/:id", updateNote);

export { noteRouter };