import { getDiscussions } from "../database/queries.js";

async function homeGet(req, res) {
  try {
    const discussions = await getDiscussions();
    return res.render('home', { discussions: discussions });
  } catch (err) {
    console.log(err);
  }
}

export { homeGet };
