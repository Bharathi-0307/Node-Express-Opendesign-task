require('dotenv').config(); 

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD, 
      database: process.env.DB_NAME,     
      port: parseInt(process.env.DB_PORT) || 5432
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    }
  }
};