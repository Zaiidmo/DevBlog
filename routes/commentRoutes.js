const express = require('express');
const router = express.Router();
const commentController=require('../controllers/commentController');




router.get('/',commentController.getCommentById);

module.exports = router;
