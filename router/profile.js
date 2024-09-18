const express=require('express');//import express
const {User}=require('../models');
const {Article}=require('../models');//import model user par ORM squelize
const router = express.Router();//cree route express
const {check, validationResult }=require('express-validator');

// get profile
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;  // Get user ID from URL parameters
    const user = await User.findByPk(userId, {
      include: [
        { model: Article, as: 'articles' },       // Articles authored by the user
        { model: Article, as: 'likedArticles' }   // Articles liked by the user
      ]
    });

    if (!user) {
      return res.render("layout", { title: "404", body: "404" });
    }

    if (user.skills && typeof user.skills === 'string') {
      user.skills = JSON.parse(user.skills);
    }
    if (user.socialMedia && typeof user.socialMedia === 'string') {
      user.socialMedia = JSON.parse(user.socialMedia);
    }

    res.render("layout", { title: "Profile", body: "profile", user, currentUser: req.user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: 'Server error' });
  }
});


 
  
//update profile
router.post('/update', async (req, res) => {
  try {
    const { username, email, password, avatar, aboutMe, socialMedia, skills, jobTitle } = req.body;
    const user = await User.findByPk(req.user.id);  

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = username;
    user.email = email;
    if (password) user.password = password;
    user.avatar = avatar;
    user.aboutMe = aboutMe;
    user.socialMedia = socialMedia; 
    user.skills = skills;
    user.jobTitle = jobTitle;
    
    await user.save();

    res.redirect(`/profile/#`);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


 module.exports = router;

 