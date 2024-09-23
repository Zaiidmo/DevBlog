const express=require('express');//import express
const {User}=require('../models');//import model user par ORM squelize
const router = express.Router();//cree route express
const multer = require('multer');
const {check, validationResult }=require('express-validator');
const isAuthenticated = require('../middleware/isAuthenticated');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/avatars'); // Folder where avatars will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
  });
   
   
   const upload = multer({ storage: storage });
   router.post('/', upload.single('avatar'), async (req, res) => {

    try {
        // console.log("userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr" ,req.session.user);
        const userId=req.session.user.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user profile picture
        user.avatar = `/uploads/avatars/${req.file.filename}`;
        await user.save();
  
        return res.redirect(`/profile/${userId}`);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
  });
  module.exports = router;