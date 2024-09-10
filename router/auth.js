const express = require('express');
const router = express.Router();
// const { User } = require('../models/user');
const bcrypt = require('bcrypt');
// const user = require('../models/user');
const { User } = require('../models');
router.get('/register', (req, res) => {
    res.render('layout',{ title: 'register', body: 'register' } );
});


router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  console.log('hello');
  console.log(User)
    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      await User.create({ username, email, password: hashedPassword });
  
      // Redirect or send a success response
      res.redirect('auth/login');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

router.get('/login', (req, res) => {
    res.render('layout',{ title: 'login', body: 'login' } );
});

module.exports = router;
