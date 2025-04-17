const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { JWT_SECRET } = process.env;

const db = require('../config/db');
const registerUser = async (req, res) => {
  const { email, password, name, mobile, parentName, plan, price, students } = req.body;

  try {
    // Check if user already exists
    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);  

    // Insert user (only user fields including the hashed password)
    const [newUser] = await db('users')
      .insert({
        email,
        password_hash: hashedPassword,  
        name,
        role: 'user', 
      })
      .returning('*');

    // JWT Token
    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

    // Insert into customers table
    const [customer] = await db('customers')
      .insert({
        user_id: newUser.id,
        name,
        mobile,
        parent_name: parentName,
        plan,
        price,
        students: JSON.stringify(students),
      })
      .returning('*');

    // Response
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

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
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
