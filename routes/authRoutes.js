const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authenticate = require('../middleware/authMiddlewre');
const { validateCustomer } = require('../validations/authValidation');
const authController = require('../controllers/authController'); 

router.post('/register', authController.registerUser);
router.post('/', authenticate, validateCustomer, customerController.createCustomer);
router.get('/', authenticate, customerController.getAllCustomers);
router.get('/:id', authenticate, customerController.getCustomerById);
router.put('/:id', authenticate, validateCustomer, customerController.updateCustomer);
router.delete('/:id', authenticate, customerController.deleteCustomer);

module.exports = router;
