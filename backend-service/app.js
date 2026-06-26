import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import { PORT } from "./config/env.js";
import authRouter from "./Routes/auth.routes.js";
import userRouter from "./Routes/user.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import projectRouter from "./Routes/project.route.js"
import agentRouter from "./Routes/agent.routes.js";



const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter)
app.use("/api/v1/agent", agentRouter)

app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("Welcome to the DevMind API!");
})

app.listen(PORT, async () => {
    console.log(`DevMind running on http://localhost:${PORT}`);
    await connectToDatabase();
})

export default app;