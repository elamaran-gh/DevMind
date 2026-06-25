import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: [true, "Project name is required"],
        trim: true 
    },

    repoUrl: {
        type: String,
        required: [true, "Repo URL is required"],
        trim: true
    },

    repoOwner: {
        type: String,
        required: true,
        trim: true
    },

    repoName:{
        type: String,
        required: true,
        trim: true
    },

    githubToken: {
        type: String, 
        required: [true, "GitHub token is required"]
    }
}, {timestamps: true})


const Project = mongoose.model("Project", projectSchema)

export default Project 