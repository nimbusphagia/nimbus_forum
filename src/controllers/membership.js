import { getInteractionsByUser } from "../database/queries.js";

async function membershipGet(req, res) {
  try {
    const interactions = await getInteractionsByUser(req.user.id);
    const countdown = 5 - interactions;
    if (req.user.role === 'member') {
      return res.render('membership', { user: req.user, countdown: countdown });
    }
    return res.render('membership', { user: req.user });
  } catch (err) {
    console.log(err);
    red.redirect('404');
  }
}

export { membershipGet }
