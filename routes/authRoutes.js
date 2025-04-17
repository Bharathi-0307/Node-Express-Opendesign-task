const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authenticate = require('../middleware/authMiddlewre');
const { validateCustomer } = require('../validations/authValidation');
const authController = require('../controllers/authController'); // Import the correct controller
router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);
router.post('/', authenticate, validateCustomer, customerController.createCustomer);
router.get('/', authenticate, customerController.getAllCustomers);
router.get('/:id', authenticate, customerController.getCustomerById);
router.put('/:id', authenticate, validateCustomer, customerController.updateCustomer);
router.delete('/:id', authenticate, customerController.deleteCustomer);

module.exports = router;


// END POINTS 
// POST	/api/auth/register	Register a new user
// POST	/api/auth/login	Login and get a JWT token
// POST	/api/customers	Create a new customer
// GET	/api/customers	Get all customers
// GET	/api/customers/:id	Get a specific customer by ID
// PUT	/api/customers/:id	Update a customer by ID
// DELETE	/api/customers/:id	Delete a customer by ID         