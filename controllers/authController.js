const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = process.env;

exports.register = async (req, res) => {
  try {
    const existingUser = await User.findByEmail(req.body.email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = await User.create({
      email: req.body.email,
      password_hash: await bcrypt.hash(req.body.password, 10),
      role: 'customer'
    });

    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.status(201).json({ user, token });
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
