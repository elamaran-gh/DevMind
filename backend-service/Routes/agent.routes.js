import { Router } from "express"
import authorize from "../middlewares/auth.middleware.js"
import { chat, getNotes, deleteNote, getFileTree } from "../controllers/agent.controller.js"

const agentRouter = Router()

agentRouter.post("/:projectId/chat", authorize, chat)
agentRouter.get("/:projectId/notes", authorize, getNotes)
agentRouter.delete("/notes/:noteId", authorize, deleteNote)
agentRouter.get("/:projectId/files", authorize, getFileTree)

export default agentRouter