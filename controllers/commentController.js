const { Comment } = require('../models'); // Make sure you're requiring the correct model

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { content, userId, articleId } = req.body;
    const comment = await Comment.create({ content, userId, articleId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating comment' });
  }
};

// Get all comments for a specific article
exports.getComments = async (req, res) => {
  try {
    const { articleId } = req.params;
    
    const comments = await Comment.findAll({ where: { articleId: articleId } });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching   ' });
  }
};

// Get a specific comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the comment by its primary key (id)
    const comment = await Comment.findByPk(id);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error('Error fetching comment:', error);
    res.status(500).json({ error: 'Error fetching comment' });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    comment.content = content;
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Error updating comment' });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    await comment.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting comment' });
  }
};
