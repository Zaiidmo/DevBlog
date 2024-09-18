const { Comment, User } = require('../models');

// Controller function to get comments by article ID
exports.getCommentsByArticleId = async (req, res) => {
  try {
    const { id: articleId } = req.params; // Extract articleId from route parameters
    const comments = await Comment.findAll({
      where: { articleId: articleId },
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']]
    });

    const formattedComments = comments.map(comment => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      username: comment.User ? comment.User.username : 'Anonymous'
    }));

    res.status(200).json(formattedComments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Error fetching comments' });
  }
};


// Controller function to create a comment
exports.createComment = async (req, res) => {
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


// Controller function to delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);

    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    await comment.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Error deleting comment' });
  }
};
