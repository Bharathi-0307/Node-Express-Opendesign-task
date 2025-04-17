// seeds/01_users_customers.js
const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('customers').del();
  await knex('users').del();

  // Insert seed entries
  const hashedPassword1 = await bcrypt.hash('password123', 10);
  const hashedPassword2 = await bcrypt.hash('password456', 10);

  const users = await knex('users').insert([
    {
      email: 'odi1@gmail.com',
      password_hash: hashedPassword1,
      name: 'ODI',
      role: 'user',
    },
    {
      email: 'odi2@gmail.com',
      password_hash: hashedPassword2,
      name: 'ODI2',
      role: 'user',
    },
  ], ['id']);

  await knex('customers').insert([
    {
      user_id: users[0].id,
      name: 'ODI Customer',
      mobile: '43534534534',
      parent_name: 'Test Parent Name',
      plan: '6M',
      price: 24000,
      students: JSON.stringify([
        { location: 'test1', studentName: 'student1' },
        { location: 'test2', studentName: 'student2' },
      ]),
    },
    {
      user_id: users[1].id,
      name: 'ODI2 Customer',
      mobile: '43534534535',
      parent_name: 'Test Parent 2',
      plan: '12M',
      price: 30000,
      students: JSON.stringify([
        { location: 'test3', studentName: 'student3' },
        { location: 'test4', studentName: 'student4' },
      ]),
    },
  ]);
};
