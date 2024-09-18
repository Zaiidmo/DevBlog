const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Get all comments for a specific article
router.get('/article/:id', commentController.getCommentByArticleID);

// Create a new comment

router.post('/', commentController.createComment);
// delete a comment

router.delete('/:id', commentController.deleteComment);

// Get all comments (if needed)
router.get('/', commentController.getAllComments);

module.exports = router;