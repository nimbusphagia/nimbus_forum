function isAuth(req, res, next) {
  const publicRoutes = ['/login', '/sign-up'];

  if (!req.isAuthenticated() && !publicRoutes.includes(req.path)) {
    return res.redirect('/login');
  }

  next();
}


export { isAuth }


