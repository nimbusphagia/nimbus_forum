import { query } from "./pool.js";

// User Queries
async function createUser(first, last, email, password) {
  const sql = `
    INSERT INTO users (first_name, last_name, email, password_hash )
    VALUES( $1, $2, $3, $4 )
    RETURNING id
  `
  const result = await query(sql, [first, last, email, password]);
  return result[0];
}

async function getUserById(id) {
  const result = await query('SELECT * FROM users WHERE id = $1', [id]);
  return result[0];

}

async function getUserByEmail(email) {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  return result[0]
}


export { createUser, getUserById, getUserByEmail }
