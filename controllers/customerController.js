exports.registerCustomer = async (req, res) => {
    try {
      const { name, email, mobile, parentName, students, plan, agreeTerms } = req.body;
  
      if (!agreeTerms) {
        return res.status(400).json({ error: 'You must agree to terms' });
      }
  
      const result = await Customer.register({
        name,
        email,
        mobile,
        parentName,
        password: req.body.password // From registration
      });
  
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ 
        error: 'Registration failed',
        details: error.message 
      });
    }
  };