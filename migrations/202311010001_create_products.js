exports.up = function(knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('title', 100).notNullable();
    table.text('description');
    table.text('content');
    table.string('category', 50);
    table.decimal('price', 10, 2).notNullable();
    table.text('image_url');
    table.timestamp('published_at');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('products');
};
