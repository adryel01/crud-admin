import { Router } from "express";
import { createSessionController } from "../controllers/session.controllers";


export const loginRouter = Router();

loginRouter.post('', createSessionController)