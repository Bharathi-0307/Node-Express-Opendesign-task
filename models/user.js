const db = require('../config/db'); // knex instance

module.exports = {
  async findByEmail(email) {
    return await db('users').where({ email }).first();
  },

  async create({ email, password_hash, name, role }) {
    const [user] = await db('users')
      .insert({
        email,
        password_hash,
        name,
        role
      })
      .returning(['id', 'email', 'name', 'role', 'created_at']);

    return user;
  }
};
