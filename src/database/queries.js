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
      u.img_url AS user_img
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

// Posts (Comments)
async function createPost(userId, discussionId, text) {
  const sql = `
    INSERT INTO posts (discussion_id, user_id, content) 
    VALUES ($1, $2, $3) 
    RETURNING discussion_id, user_id`;
  console.log(discussionId, userId, text);
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

export { createUser, getUserById, getUserByEmail };
export { createDiscussion, getDiscussions, getDiscussionById };
export { createPost, getPostsByDiscussion };

