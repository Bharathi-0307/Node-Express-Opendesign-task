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

    // Insert customer data using Knex
    const [customer] = await db('customers')
      .insert({
        user_id: newUser.id,
        name,
        mobile,
        parent_name: parentName,
        plan,
        price,
        students: JSON.stringify(students), // optional: use JSONB type in DB
      })
      .returning('*');

    res.status(201).json({
      user: newUser,
      token,
      customer,
    });

  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db('users').where({ email }).first(); 

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash); 
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

module.exports = { registerUser, loginUser };
