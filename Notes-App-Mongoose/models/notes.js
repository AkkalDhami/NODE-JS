import mongoose from "mongoose";
try {
    await mongoose.connect("mongodb://127.0.0.1:27017/notesApp");
    console.log("Database connected successfully");
    mongoose.set("debug", true);
} catch (error) {
    console.log(error);
    process.exit();
}

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },

    },

    {
        timestamps: true,
    }
);

export const Note = mongoose.model("Note", noteSchema);
