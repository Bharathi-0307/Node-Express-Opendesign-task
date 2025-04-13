exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'admin@example.com',
          password_hash: '$2a$10$examplehash',
          role: 'admin'
        },
        {
          email: 'customer@example.com',
          password_hash: '$2a$10$examplehash',
          role: 'customer'
        }
      ]);
    });
};