const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/auth');
const authenticateToken = require('./middleware/authMiddlewre');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);

app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed', user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
