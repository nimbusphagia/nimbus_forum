import { Router } from "express";
import { homeGet } from "../controllers/home.js";
import { isAuth } from "./authMiddleware.js";

const homeRouter = new Router();
homeRouter.get('/', isAuth, homeGet);

export default homeRouter;
