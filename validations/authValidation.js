const { body } = require('express-validator');
const validateCustomer = [
  body('name').notEmpty().withMessage('Name is required'),
  body('mobile').notEmpty().withMessage('Mobile is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];
const registerSchema = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('name').notEmpty().trim()
];

const loginSchema = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];

module.exports = {
  registerSchema,
  loginSchema,
  validateCustomer
};