import mongoose from "mongoose";
let homeSchema = new mongoose.Schema({
    houseName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    markedPrice: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    houseImage: {
        type: String
    },
    description: {
        type: String,
    }
});

export default mongoose.model('Home', homeSchema);