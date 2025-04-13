exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
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