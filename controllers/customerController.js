const pool = require('../config/db'); 

exports.createCustomer = async (req, res) => {
  const { name, mobile, parent_name,plan,price, location } = req.body;
  const user_id = req.user.userId;

  try {
    const [customer] = await db('customers')
      .insert({
        user_id,
        name,
        mobile,
        parent_name,
        plan,
        price,
        location
      })
      .returning('*'); 

    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await db('customers').where({ user_id: req.user.userId });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await db('customers')
      .where({ id, user_id: req.user.userId })
      .first();

    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, mobile, parent_name, location } = req.body;

  try {
    const [updatedCustomer] = await db('customers')
      .where({ id, user_id: req.user.userId })
      .update({
        name,
        mobile,
        parent_name,
        location
      })
      .returning('*');

    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found or unauthorized' });
    }

    res.json(updatedCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const [deletedCustomer] = await db('customers')
      .where({ id, user_id: req.user.userId })
      .del()
      .returning('*');

    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found or unauthorized' });
    }

    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
