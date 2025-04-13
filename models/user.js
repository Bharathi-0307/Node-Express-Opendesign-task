const pool = require('../config/db.js'); 

module.exports = {
  async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1', 
      [email]
    );
    return result.rows[0];
  },

  async create({ email, password_hash, name, role }) {
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, name, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, name, role, created_at`,
      [email, password_hash, name, role]
    );
    return result.rows[0];
  }
};