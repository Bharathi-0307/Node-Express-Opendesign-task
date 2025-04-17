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
    },
    seeds: {
      directory: './seeds',
    },
  }
};



// INFOS about the DB
// initdb -D ..\data -U postgres -W

// Run the server
// pg_ctl -D ..\data -l ..\logfile.log start

// pg_isready

// Access the SQL shell:
// psql -U postgres -d postgres

// CREATE DATABASE ecommerce_db;



// npm install pg

// pg_ctl -D ..\data stop   # Stop server
// pg_ctl -D ..\data start  # Start again

// insert data dummy for testing
// npx knex seed:run




// NEW MIGRATE 

// Completely reset your database:

// npx knex migrate:rollback --all
// npx knex migrate:latest
// npx knex seed:run