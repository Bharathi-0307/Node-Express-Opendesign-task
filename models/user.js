const db = require('../config/db');

module.exports = {
  async create(user) {
    return await db('users').insert(user).returning('*');
  },
  async findByEmail(email) {
    return await db('users').where({ email }).first();
  },
  async findById(id) {
    return await db('users').where({ id }).first();
  }
};