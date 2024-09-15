const express=require('express');//import express
const {User}=require('../models');//import model user par ORM squelize
const router = express.Router();//cree route express
const multer = require('multer');
const {check, validationResult }=require('express-validator');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/avatars'); // Folder where avatars will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
  });
   
   module.exports = router;
   const upload = multer({ storage: storage });
   router.post('/update-avatar', upload.single('avatar'), async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
  
        // Update user profile picture
        user.profilePicture = `/uploads/avatars/${req.file.filename}`;
        await user.save();
  
        res.redirect('/profile');
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
  });