const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', customerController.registerCustomer);
// Add other customer routes

module.exports = router;