const db = require('../config/db');

module.exports = {
  async create(product) {
    return await db('products').insert(product).returning('*');
  },
  async findAll() {
    return await db('products').select('*');
  },
  async findById(id) {
    return await db('products').where({ id }).first();
  }
};