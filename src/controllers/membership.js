async function membershipGet(req, res) {
  res.render('membership', { user: req.user });
}

export { membershipGet }
