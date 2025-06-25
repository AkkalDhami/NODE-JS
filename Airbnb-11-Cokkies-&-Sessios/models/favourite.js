import mongoose from 'mongoose';
import home from './home.js';

const favouriteSchema = new mongoose.Schema({
    homeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Home',
        required: true,
        unique: true
    }
})


export default mongoose.model('Favourite', favouriteSchema);