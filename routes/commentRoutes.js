const express = require('express');
const router = express.Router();

// Import your comment controller functions
const commentController = require('../controllers/commentController');
const isAuthenticated = require('../middleware/isAuthenticated'); // Require the middleware

// Apply isAuthenticated middleware only to routes that need authentication

// GET request for fetching comments by article ID (no authentication required)
// router.get('/article/:id', commentController.getCommentsByArticleId);

// POST request for creating a new comment (authentication required)
router.post('/', commentController.createComment);

// DELETE request for deleting a comment by ID (authentication required)
router.delete('/:id', isAuthenticated, commentController.deleteComment);

module.exports = router;
