import { Router } from "express";
import { homeGet } from "../controllers/home.js";

const homeRouter = new Router();
homeRouter.get('/', homeGet);

export default homeRouter;
