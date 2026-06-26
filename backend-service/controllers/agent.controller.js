import Project from "../models/project.model.js"
import Note from "../models/note.model.js"
import { agentLoop } from "../agent/agentLoop.js"

export const chat = async (req, res, next) => {
    try {
        const { message } = req.body
        const { projectId } = req.params

        // Get project — has githubToken, repoOwner, repoName
        const project = await Project.findOne({
            _id: projectId,
            userId: req.userId
        })

        if (!project) {
            const error = new Error("Project not found")
            error.statusCode = 404
            throw error
        }

        // Run agent loop
        const { answer, usedFile } = await agentLoop(message, project)

        // Auto-save solution to notes
        await Note.create({
            projectId,
            solution: answer,
            file: usedFile
        })

        res.status(200).json({
            success: true,
            data: {
                answer,
                file: usedFile
            }
        })

    } catch (error) {
        next(error)
    }
}

export const getNotes = async (req, res, next) => {
    try {
        const { projectId } = req.params

        const notes = await Note.find({ projectId })
            .sort({ createdAt: -1 })

        res.status(200).json({ success: true, data: notes })

    } catch (error) {
        next(error)
    }
}

export const deleteNote = async (req, res, next) => {
    try {
        await Note.findByIdAndDelete(req.params.noteId)
        res.status(200).json({ success: true, message: "Note deleted" })
    } catch (error) {
        next(error)
    }
}

export const getFileTree = async (req, res, next) => {
    try {
        const project = await Project.findOne({
            _id: req.params.projectId,
            userId: req.userId
        })

        if (!project) {
            const error = new Error("Project not found")
            error.statusCode = 404
            throw error
        }

        const { githubToken, repoOwner, repoName } = project

        const response = await fetch(
            `https://api.github.com/repos/${repoOwner}/${repoName}/git/trees/HEAD?recursive=1`,
            {
                headers: {
                    Authorization: `Bearer ${githubToken}`,
                    Accept: "application/vnd.github.v3+json"
                }
            }
        )

        const data = await response.json()

        // only files, not folders, filter out node_modules
        const files = data.tree
            .filter(item => item.type === "blob" && !item.path.includes("node_modules"))
            .map(item => ({ path: item.path }))

        res.status(200).json({ success: true, data: files })

    } catch (error) {
        next(error)
    }
}