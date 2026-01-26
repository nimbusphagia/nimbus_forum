import { Router } from "express";
import { validationResult } from "express-validator";
import { signupGet, signupPost } from "../controllers/sign-up.js";
import { signupValidator } from "../validators/authValidators.js";

const signupRouter = new Router();

signupRouter.get("/sign-up", signupGet);

signupRouter.post(
  "/sign-up",
  signupValidator,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", {
        errors: errors.array(),
        oldData: req.body
      });
    }

    next();
  },
  signupPost
);

export default signupRouter;

