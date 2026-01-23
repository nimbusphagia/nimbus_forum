import bcrypt from 'bcrypt';
import { createUser } from '../database/queries.js';

async function signupGet(req, res) {
  res.render('sign-up');
}

async function signupPost(req, res) {
  const { email, password, confirm_password, first_name, last_name } = req.body;
  if (password !== confirm_password) {
    return res.redirect('/sign-up?warning=invalid-form');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const id = await createUser(first_name, last_name, email, hashedPassword);
  } catch (err) {
    return res.redirect('/sign-up?warning=invalid-form');
  }
  return res.redirect('/login?registered=true');
}

export { signupGet, signupPost };
