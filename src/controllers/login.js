
async function loginGet(req, res) {
  res.render('login');
}
async function loginPost(req, res) {
  res.redirect('/');
}
export { loginGet, loginPost }
