import { Router } from "express";
import { membershipGet } from "../controllers/membership.js";

const membershipRouter = new Router();
membershipRouter.get('/user/membership', membershipGet);

export default membershipRouter;
