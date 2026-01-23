import { Router } from "express";


const logoutRouter = new Router();

logoutRouter.post('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
})

export default logoutRouter;
