import { Router } from "express"
import authorize from "../middlewares/auth.middleware.js"
import { getProjects, createProjects, deleteProject } from "../controllers/project.controller.js"


const projectRouter = Router()

projectRouter.get('/' ,authorize ,getProjects)

projectRouter.post('/' ,authorize , createProjects)

projectRouter.delete('/:id' ,authorize ,deleteProject)

export default projectRouter