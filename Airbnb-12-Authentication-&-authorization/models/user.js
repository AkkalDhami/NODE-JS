import mongoose from "mongoose";
let userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
    },
    lname: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role: {
        type: String,
        enum: ["guest", "host"],
        default: "guest"
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Home"
    }]
});
userSchema.methods.isHost = function () {
    return this.role === "host";
};
userSchema.methods.isGuest = function () {
    return this.role === "guest";
};
export default mongoose.model("User", userSchema);