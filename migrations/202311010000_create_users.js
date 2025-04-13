exports.up = function(knex) {
  return knex.schema.createTable('customers', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.string('name').notNullable();
    table.string('mobile').notNullable();
    table.string('parent_name');
    table.text('location');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('customers');
};
