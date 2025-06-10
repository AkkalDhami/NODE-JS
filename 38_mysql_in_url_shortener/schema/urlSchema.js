import mongoose from "mongoose";
const urlSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    url: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        required: true,
        unique: true
    }
});

export const Url = mongoose.model("Url", urlSchema);