const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { body, validationResult } = require('express-validator');
//const isAuthenticated = require('../middleware/isAuthenticated');  add this middleware to profile 

// Validation middleware
const validateRegister = [
    body('username')
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters long')
      .trim()
      .escape(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ];


  //validator of login
const validateLogin = [
body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];


// get register
router.get('/register', (req, res) => {
  res.render('layout', { title: 'Register', body: 'register', errors: [] });
});


//post register
router.post('/register', validateRegister, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('layout', { 
      title: 'Register', 
      body: 'register', 
      errors: errors.array() 
    });
  }

  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.render('layout', { 
        title: 'Register', 
        body: 'register', 
        errors: [{ msg: 'Email already in use' }] 
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ username, email, password: hashedPassword });

    res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


// get the login
router.get('/login', (req, res) => {
  res.render('layout', { title: 'Login', body: 'login', errors: [] });
});


//post the login
router.post('/login', validateLogin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('layout', { 
      title: 'Login', 
      body: 'login', 
      errors: errors.array() 
    });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.render('layout', { 
        title: 'Login', 
        body: 'login', 
        errors: [{ msg: 'Invalid credentials' }] 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('layout', { 
        title: 'Login', 
        body: 'login', 
        errors: [{ msg: 'Invalid credentials' }] 
      });
    }

    // Set user session
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email
    };
    
    // res.locals.user = req.session.user;
    res.redirect('/articles');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/');
  });
});





module.exports = router;