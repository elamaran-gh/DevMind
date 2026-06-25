import { Router } from 'express';
import { login, register, logout } from '../controllers/auth.controllers.js';


const authRouter = Router();

//path: /api/v1/auth/register (POST)
authRouter.post("/register", register);

//path: /api/v1/auth/login (POST)
authRouter.post("/login", login);

//path: /api/v1/auth/logout (POST)
authRouter.post("/logout", logout);

export default authRouter;

