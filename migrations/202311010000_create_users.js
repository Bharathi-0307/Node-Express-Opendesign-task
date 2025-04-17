exports.up = async function(knex) {
  // Create the 'users' table
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary(); // Auto-incremented ID
    table.string('email').notNullable().unique(); // Unique email
    table.string('name').notNullable(); // Name field
    table.string('password_hash').notNullable(); // Password hash field
    table.string('role').defaultTo('user').notNullable(); // Role with default value 'user'
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp for creation
    table.timestamp('updated_at').defaultTo(knex.fn.now()); 
    table.string('mobile');  
    table.string('parent_name'); 
  });

  // Create the 'customers' table
  await knex.schema.createTable('customers', (table) => {
    table.increments('id').primary(); // Auto-incremented ID
    table.integer('user_id').unsigned().notNullable(); // Foreign key reference to users table
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE'); // Foreign key relationship
    table.string('name').notNullable();
    table.string('mobile').notNullable();
    table.string('parent_name');
    table.string('plan');
    table.decimal('price');
    table.jsonb('students');
    table.text('location');
    table.timestamps(true, true); // Created and updated timestamps
  });
};

exports.down = async function(knex) {
  // Drop the 'customers' table first because it depends on the 'users' table
  await knex.schema.dropTableIfExists('customers');
  // Drop the 'users' table
  await knex.schema.dropTableIfExists('users');
};
