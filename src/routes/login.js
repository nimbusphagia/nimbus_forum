import { Router } from "express";
import { loginGet } from "../controllers/login.js";
import passport from "passport";


const loginRouter = new Router();
loginRouter.get('/login', loginGet);
loginRouter.post('/login', passport.authenticate('local', {
  failureRedirect: '/login?warning=invalid-validation',
  successRedirect: '/'
})
)

export { loginRouter }
