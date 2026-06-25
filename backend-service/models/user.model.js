import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters long"],
        maxLength: [50, "Name must be at most 50 characters long"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Email is invalid"],

    },
    password: {
        type: String,
        required: [true, "User Password is required"],
        minLength: [6, "Password must be at least 6 characters long"],
    }
}, {timestamps: true,});


const User = mongoose.model("User", userSchema);

export default User;