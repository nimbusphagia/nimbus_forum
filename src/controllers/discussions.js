import { createDiscussion, createPost, getDiscussionById, getInteractionsByUser, getPostsByDiscussion, getPostsByUser, getUserById, updateRole } from "../database/queries.js";

async function discussionsGet(req, res) {
  res.redirect('/explore');
}

async function newGet(req, res) {
  if (req.user.role === 'member') {
    return res.redirect('/user/membership?warning=tier1');
  }
  return res.render('new-discussion');
}
async function newPost(req, res) {
  const { title, description, img_url } = req.body;
  // Check if img is a url
  try {
    const discussionId = await createDiscussion(req.user.id, title, description, img_url)
    return res.redirect('/discussions/' + discussionId);
  } catch (err) {
    console.log(err);
    return res.redirect('/');
  }
}
async function discussionGet(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid discussion id' })
  }
  try {
    const discussion = await getDiscussionById(id);
    const user = await getUserById(discussion.created_by);
    const comments = await getPostsByDiscussion(discussion.id);
    if (req.user.role === 'member') {
      user.first_name = 'Anonymous';
      user.last_name = 'Goose';
      for (const c of comments) {
        c.username = 'Anonymous';
      }
    }
    return res.render('discussion', { discussion: discussion, user: user, comments: comments })
  } catch (err) {
    console.log(err);
    return res.redirect('/');
  }
}

async function commentPost(req, res) {
  const { id } = req.query;
  const { content } = req.body;
  const userId = req.user.id;
  try {
    await createPost(Number(id), Number(userId), content);
    const interactions = await getInteractionsByUser(userId);

    if (req.user.role === 'member' && interactions >= 5) {
      await updateRole(userId);
      return res.redirect('/user/membership?new-role=trusted');
    }
    return res.redirect('/discussions/' + id);
  } catch (err) {
    console.log(err);
    return res.redirect('/');
  }
}
export { discussionsGet, discussionGet };
export { newGet, newPost };
export { commentPost };
