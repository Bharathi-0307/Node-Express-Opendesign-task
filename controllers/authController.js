const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = process.env;

const registerUser = async (req, res) => {
  const { email, password, name, mobile, parentName, plan, price, students } = req.body;

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password_hash: hashedPassword,
      name,
      mobile
    });

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET);

    const customerData = {
      user_id: newUser.id,
      name,
      mobile,
      parent_name: parentName,
      plan,
      price,
      students: JSON.stringify(students), 
    };

    const customerResult = await pool.query(
      'INSERT INTO customers (user_id, name, mobile, parent_name, plan, price, students) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        customerData.user_id,
        customerData.name,
        customerData.mobile,
        customerData.parent_name,
        customerData.plan,
        customerData.price,
        customerData.students
      ]
    );

    res.status(201).json({
      user: newUser,
      token,
      customer: customerResult.rows[0] 
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

module.exports = { registerUser, loginUser };
