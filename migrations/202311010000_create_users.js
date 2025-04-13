exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('email', 255).unique().notNullable();
      table.string('password_hash').notNullable();
      table.enu('role', ['admin', 'customer']).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };