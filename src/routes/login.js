import { Router } from "express";
import passport from "passport";
import { validationResult } from "express-validator";
import { loginGet } from "../controllers/login.js";
import { loginValidator } from "../validators/authValidators.js";

const loginRouter = new Router();

loginRouter.get("/login", loginGet);

loginRouter.post(
  "/login",
  loginValidator,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.redirect("/login?warning=invalid-validation");
    }

    next(); // only call passport if validation passed
  },
  passport.authenticate("local", {
    failureRedirect: "/login?warning=invalid-credentials",
    successRedirect: "/"
  })
);

export { loginRouter };

