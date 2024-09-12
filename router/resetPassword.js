
const express = require('express');
const router = express.Router();
// const isAuthenticated = require('../middleware/isAuthenticated');



router.get('/forgot-password', async (req, res) => {
    req.render('forget-password', {title: 'forget password', body: 'forget_password'})
})
module.exports = router;
