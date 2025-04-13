exports.seed = function(knex) {
  return knex('customers').del()
    .then(() => knex('users').where('email', 'customer@example.com').first())
    .then(user => {
      return knex('customers').insert([
        {
          user_id: user.id,
          name: 'John Customer',
          mobile: '9876543210',
          parent_name: 'Parent Name',
          location: 'Sample Location'
        }
      ]);
    });
};