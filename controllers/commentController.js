const { Comment, User } = require('../models');
const {check, validationResult }=require('express-validator');

// Controller function to get comments by article ID
// exports.getCommentsByArticleId = async (req, res) => {
//   try {
//     const { id: articleId } = req.params; // Extract articleId from route parameters
//     const comments = await Comment.findAll({
//       where: { articleId: articleId },
//       include: [{ model: User, attributes: ['username'] }],
//       order: [['createdAt', 'DESC']]
//     });

//     const formattedComments = comments.map(comment => ({
//       id: comment.id,
//       content: comment.content,
//       createdAt: comment.createdAt,
//       username: comment.User ? comment.User.username : 'Anonymous'
//     }));

//     res.status(200).json(formattedComments);
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     res.status(500).json({ error: 'Error fetching comments' });
//   }
// };


// Controller function to create a comment
exports.createComment = async (req, res) => {
  
  // Define validation rules
  const rules = [
    check('content')
      .notEmpty().withMessage('Content is required')
      .isLength({ max: 500 }).withMessage('Content must be less than 500 characters'),
    check('articleId')
      .notEmpty().withMessage('Article ID is required')
      .isInt().withMessage('Article ID must be a valid integer')
  ];

  // Run validation rules
  await Promise.all(rules.map(rule => rule.run(req)));

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.session.user.id; // Keep userId from the session
    const { content, articleId } = req.body;

    const comment = await Comment.create({ content, userId, articleId });
    
    let username = 'Anonymous';
    if (userId) {
      const user = await User.findByPk(userId);
      username = user ? user.username : 'Anonymous';
    }

    res.status(201).json({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      username: username
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Error creating comment' });
  }
};




exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params; // Extract comment ID from route parameters
    await Comment.destroy({ where: { id: id } }); // Delete the comment by ID

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Error deleting comment' });
  }
};