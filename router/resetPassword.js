
const express = require('express');
const router = express.Router();
// const isAuthenticated = require('../middleware/isAuthenticated');


router.get('/forgot-password', (req, res) => {
    res.render('layout', { title: 'forgetpass', body: 'forgetpass' });
});



module.exports = router;