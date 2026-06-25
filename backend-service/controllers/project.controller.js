import  Project from "../models/project.model.js"


// GET /api/v1/projects — get all projects for logged in user
export const getProjects = async (req, res, next) => {
    try{

        const projects = await Project.find({ userId: req.userId })
        res.status(200).json({ success: true, data: projects })


    }catch(error) {
        next(error)
    }
}

// POST /api/v1/projects — create new project
export const createProjects = async (req, res, next) => {
    try {
        const { name, repoUrl, githubToken } = req.body


        const cleaned = repoUrl
            .replace("https://github.com/", "")
            .replace("http://github.com/", "")
            .replace("github.com/", "")
            .split("?")[0]  
            .replace(/\/$/, "") 

        const urlParts = cleaned.split("/")
        const repoOwner = urlParts[0]
        const repoName = urlParts[1]

        if (!repoOwner || !repoName) {
            const error = new Error("Invalid GitHub repo URL")
            error.statusCode = 400
            throw error
        }

        const project = await Project.create({
            userId: req.userId,
            name,
            repoUrl,
            repoOwner,
            repoName,
            githubToken
        })

        res.status(201).json({ success: true, data: project })

    } catch (error) {
        next(error)
    }
}

// DELETE /api/v1/projects/:id
export const deleteProject = async (req, res, next) => {
    try{

        const project = await Project.findOne({ _id: req.params.id, userId: req.userId })

        if(!project) {
            const error = new Error("Project not found")
            error.statusCode = 404
            throw error
        }

        await project.deleteOne()
        res.status(200).json({ success: true, message: "project deleted"})

    }catch(error) {
        next(error)
    }
}