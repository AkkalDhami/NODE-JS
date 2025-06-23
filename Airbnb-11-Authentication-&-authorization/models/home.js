import mongoose from "mongoose";
import Favourite from "./favourite.js";
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

homeSchema.pre("findOneAndDelete", async function () {
    const homeId = this.getQuery()._id;
    await Favourite.deleteMany({ homeId: homeId });
});

export default mongoose.model('Home', homeSchema);