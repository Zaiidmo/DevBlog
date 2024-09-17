const express=require('express');//import express
const {User}=require('../models');//import model user par ORM squelize
const router = express.Router();//cree route express
const {check, validationResult }=require('express-validator');

// get profile
router.get('/', async (req, res) => {
    try {
       const user = await User.findByPk(2); 
       if (!user) {
          console.log("User not found");
          return res.status(404).json({ error: 'User not found' });
       }
 
       // Render the profile page
       if (typeof user.skills === 'string') {
         user.skills = JSON.parse(user.skills);
       }
       if (typeof user.socialMedia === 'string') {
         user.socialMedia = JSON.parse(user.socialMedia);
       }
       res.render("layout", { title: "Profile", body: "profile", user,currentUser: req.user });
    } catch (error) {
       console.error("Error fetching user:", error); 
       res.status(500).json({ error: 'Server error' });
    }
 });

 
  
//update profile
router.post('/update', async (req, res) => {
  try {
    const { username, email, password, avatar, aboutMe, socialMedia, skills, jobTitle } = req.body;
    const user = await User.findByPk(2);  // Supposons que vous mettez à jour l'utilisateur avec l'ID 2

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = username;
    user.email = email;
    if (password) user.password = password;
    user.avatar = avatar;
    user.aboutMe = aboutMe;
    user.socialMedia = socialMedia; // Directement enregistrer l'objet socialMedia
    user.skills = skills;
    user.jobTitle = jobTitle;
    
    await user.save();

    res.redirect(`/profile/#`);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


 module.exports = router;

 