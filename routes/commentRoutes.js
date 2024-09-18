const express = require('express');
const router = express.Router();

// Import your comment controller functions
const commentController = require('../controllers/commentController');

// GET request for fetching comments by article ID
router.get('/article/:id', commentController.getCommentsByArticleId);

// POST request for creating a new comment
router.post('/', commentController.createComment);

// DELETE request for deleting a comment by ID
router.delete('/:id', commentController.deleteComment);

module.exports = router;
