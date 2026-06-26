import mongoose from "mongoose"

const noteSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    solution: {
        type: String,
        required: true
    },
    file: {
        type: String,
        defualt: null
    }
}, { timestamps: true})

const Note = mongoose.model("Note", noteSchema)

export default Note