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
  exports.up = function(knex) {
    return knex.schema.hasTable('customers').then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('customers', function(table) {
          table.increments('id').primary();
          table.integer('user_id').notNullable();
          table.string('name').notNullable();
          table.string('mobile').notNullable();
          table.string('parent_name');
          table.string('plan');
          table.decimal('price');
          table.jsonb('students');
          table.text('location');
          table.timestamps(true, true);
        });
      }
    });
  };
};

exports.down = async function(knex) {
  // Drop the 'customers' table first as it has a foreign key dependency on 'users'
  await knex.schema.dropTableIfExists('customers');
  await knex.schema.dropTableIfExists('users');
};

