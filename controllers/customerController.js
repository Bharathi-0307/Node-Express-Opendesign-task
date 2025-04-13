const pool = require('../config/db.js'); 

exports.createCustomer = async (req, res) => {
  const { name, mobile, parent_name, location } = req.body;
  const user_id = req.user.userId;

  try {
    const result = await pool.query(
      'INSERT INTO customers (user_id, name, mobile, parent_name, location) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, name, mobile, parent_name, location]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers WHERE user_id = $1', [req.user.userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM customers WHERE id = $1 AND user_id = $2', [id, req.user.userId]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Customer not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, mobile, parent_name, location } = req.body;

  try {
    const result = await pool.query(
      'UPDATE customers SET name = $1, mobile = $2, parent_name = $3, location = $4 WHERE id = $5 AND user_id = $6 RETURNING *',
      [name, mobile, parent_name, location, id, req.user.userId]
    );

    if (result.rows.length === 0) return res.status(404).json({ message: 'Customer not found or unauthorized' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM customers WHERE id = $1 AND user_id = $2 RETURNING *', [id, req.user.userId]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Customer not found or unauthorized' });
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
