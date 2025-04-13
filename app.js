require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);


// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





// END POINTS 

// POST	/api/auth/register	Register a new user
// POST	/api/auth/login	Login and get a JWT token
// POST	/api/customers	Create a new customer
// GET	/api/customers	Get all customers
// GET	/api/customers/:id	Get a specific customer by ID
// PUT	/api/customers/:id	Update a customer by ID
// DELETE	/api/customers/:id	Delete a customer by ID