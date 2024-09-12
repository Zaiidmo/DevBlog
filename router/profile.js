const express=require('express');//import express
const {User}=require('../models');//import model user par ORM squelize
const router = express.Router();//cree route express
const {check, validationResult }=require('express-validator');

// get profile
router.get('/', async (req, res) => {
    try {
       const user = await User.findByPk(1); 
       if (!user) {
          console.log("User not found");
          return res.status(404).json({ error: 'User not found' });
       }
 
       // Render the profile page
       res.render("layout", { title: "Profile", body: "profile", user });
    } catch (error) {
       console.error("Error fetching user:", error); 
       res.status(500).json({ error: 'Server error' });
    }
 });

 
  
//update profile
router.put(
   '/',
   [
    check('username').notEmpty().withMessage('enter votre usernme'),
    check('email').isEmail().withMessage('enter votre email'),
   ] ,
   async(req, res)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{
        const{ username,email,password,avatar}=re.body;
        const user= await user.findByPk(req.user.id);
  
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
     user.username = username;
      user.email = email;
      user.avatar = avatar;
      user.password = password;
      await user.save();
      res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
});
module.exports = router;