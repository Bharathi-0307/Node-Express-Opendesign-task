exports.up = async function(knex) {
  // Create the 'users' table
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary(); // Auto-incremented ID
    table.string('email').notNullable().unique(); // Unique email
    table.string('name').notNullable(); // Name field
    table.string('password_hash').notNullable(); // Password hash field
    table.string('role').defaultTo('user').notNullable(); // Role with default value 'user'
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp for creation
    table.timestamp('updated_at').defaultTo(knex.fn.now()); // Timestamp for updates
  });

  // Create the 'customers' table
  // await knex.schema.createTable('customers', (table) => {
  //   table.increments('id').primary(); // Auto-incremented ID
  //   table.integer('user_id').unsigned().notNullable(); // Foreign key to users table
  //   table.foreign('user_id').references('users.id').onDelete('CASCADE'); // Foreign key constraint
  //   table.string('name').notNullable(); // Customer name
  //   table.string('mobile').notNullable(); // Customer mobile number
  //   table.string('parent_name').notNullable(); // Parent name
  //   table.string('plan').notNullable(); // Plan type
  //   table.integer('price').notNullable(); // Price
  //   table.json('students').notNullable(); // JSON column for storing student data
  //   table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp for creation
  //   table.timestamp('updated_at').defaultTo(knex.fn.now()); // Timestamp for updates
  // });
};

exports.down = async function(knex) {
  // Drop the 'customers' table first as it has a foreign key dependency on 'users'
  await knex.schema.dropTableIfExists('customers');
  await knex.schema.dropTableIfExists('users');
};

