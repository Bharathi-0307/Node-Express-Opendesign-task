const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

// Test connection
db.raw('SELECT 1')
  .then(() => console.log('PostgreSQL connected'))
  .catch((err) => console.error('PostgreSQL connection error:', err));

module.exports = db;