import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    redirectUrl: {
        type: String,
        required: true
    },
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    visitHistory: [
        {
            timestamp: {
                type: Number
            }
        }
    ]

}, {
    timestamps: true
});

export const Url = mongoose.model("Url", urlSchema);