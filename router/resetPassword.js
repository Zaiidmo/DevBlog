
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { User } = require('../models');
const { where } = require('sequelize');
// const isAuthenticated = require('../middleware/isAuthenticated');


router.get('/forgot-password', (req, res) => {
    res.render('layout', { title: 'forgetpass', body: 'forgetpass' });
});



const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "oussamabenmazzi223@gmail.com",
        password: "iwaq sgpj uslz fscq"
    }
})


router.post('/forgot-password', async (req, res)=>
{
    const {email} = req.body;
    //find the user 
    const FindUser =await User.findOne({where : {email}});
    
    console.log(FindUser);

    if(!FindUser)
    {
        return res.status(400).send('Email Not Found');
    }

    const ResetToken = crypto.randomBytes(20).toString('hex');
    const resetPasswordPeriod = Date.now() + 3600000;

    





    
})



module.exports = router;