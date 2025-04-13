const db = require('../config/db');

module.exports = {
  async register(payload) {
    const trx = await db.transaction();
    try {
      // Create user first
      const [user] = await trx('users')
        .insert({
          email: payload.email,
          password_hash: payload.password,
          role: 'customer'
        })
        .returning('*');

      // Then create customer
      const [customer] = await trx('customers')
        .insert({
          user_id: user.id,
          name: payload.name,
          mobile: payload.mobile,
          parent_name: payload.parentName
        })
        .returning('*');

      await trx.commit();
      return { user, customer };
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }
};