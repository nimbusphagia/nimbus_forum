import { Router } from "express";
import { signupGet } from "../controllers/sign-up.js";

const signupRouter = new Router();
signupRouter.get('/sign-up', signupGet);

export default signupRouter;
