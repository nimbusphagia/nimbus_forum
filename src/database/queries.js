import { query } from "./pool.js";

// User Queries
async function createUser(first, last, email, password) {
  const sql = `
    INSERT INTO users (first_name, last_name, email, password_hash )
    VALUES( $1, $2, $3, $4 )
    RETURNING id
  `;
  const rows = await query(sql, [first, last, email, password]);
  return rows[0];
}

async function getUserById(id) {
  const rows = await query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0];

}

async function getUserByEmail(email) {
  const rows = await query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0]
}
async function updateRole(user_id, role = 'trusted_member') {
  const rows = await query('UPDATE users SET role = $2 WHERE id = $1', [user_id, role]);
  return rows;
}
// Discussions

async function createDiscussion(user_id, title, description, img_url = 'https://img.freepik.com/premium-vector/girl-with-plants-drinks-retro-style-illustration_926667-5360.jpg?semt=ais_hybrid&w=740&q=80') {
  const sql = `
    INSERT INTO discussions (created_by, title, description, img_url)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `
  const rows = await query(sql, [user_id, title, description, img_url]);
  return rows[0].id;
}

async function getDiscussions() {
  const sql = `
    SELECT 
      d.id,
      d.title,
      d.description,
      d.created_at,
      u.first_name || ' ' || u.last_name AS username,
      u.img_url AS user_img,
      u.role
    FROM discussions d
    LEFT JOIN users u
      ON d.created_by = u.id
    ORDER BY d.created_at DESC
  `;
  const rows = await query(sql, []);
  return rows;
}

async function getDiscussionById(id) {
  const sql = 'SELECT * FROM discussions WHERE id = $1';
  const rows = await query(sql, [id]);
  return rows[0];
}

async function getDiscussionsByUser(user_id) {
  const rows = await query('SELECT * FROM discussions WHERE created_by = $1', [user_id]);
  return rows;
}

// Posts (Comments)
async function createPost(discussionId, userId, text) {
  const sql = `
    INSERT INTO posts (discussion_id, user_id, content) 
    VALUES ($1, $2, $3) 
    RETURNING discussion_id, user_id`;
  const rows = await query(sql, [discussionId, userId, text]);
  return rows[0] || null;
}
async function getPostsByDiscussion(discussion_id) {
  const sql = `
    SELECT
      u.first_name || ' ' || u.last_name AS username,
      c.content,
      c.created_at,
      c.discussion_id
    FROM posts c
    LEFT JOIN users u
      ON u.id = c.user_id
    WHERE c.discussion_id = $1
    ORDER BY c.created_at DESC
  `;

  const rows = await query(sql, [discussion_id]);
  return rows;
}

async function getPostsByUser(user_id) {
  const rows = await query('SELECT * FROM posts WHERE user_id = $1', [user_id]);
  return rows;
}

async function getInteractionsByUser(user_id) {
  const sql = `
    SELECT COUNT(DISTINCT discussion_id) AS interactions
    FROM posts
    WHERE user_id = $1;
  `;
  const rows = await query(sql, [user_id]);
  return rows[0].interactions;
}

export { createUser, getUserById, getUserByEmail, updateRole };
export { createDiscussion, getDiscussions, getDiscussionById, getDiscussionsByUser };
export { createPost, getPostsByDiscussion, getPostsByUser, getInteractionsByUser };

