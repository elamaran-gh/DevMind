import {Router} from "express";
import { getusers, getuser } from "../controllers/user.controller.js"
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getusers)

userRouter.get("/:id", authorize, getuser)

userRouter.post("/", (req, res) => res.send({"title": "Create a new user"}))

userRouter.put("/:id", (req, res) => res.send({"title": "Update user by id"}))

userRouter.delete("/:id", (req, res) => res.send({"title": "Delete user by id"}))

export default userRouter;