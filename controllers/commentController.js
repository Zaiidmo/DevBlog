const { Comment } = require('../models');
const { User } = require('../models');

exports.createComment = async (req, res) => {
  try {
    const { content, userId, articleId } = req.body;
    const comment = await Comment.create({ content, userId, articleId });
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Error creating comment' });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching comments for article:', id);
    const comments = await Comment.findAll({ 
      where: { articleId: id },
      include: [{ model: User, attributes: ['username'] }]
    });
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Error fetching comments' });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [{ model: User, attributes: ['username'] }]
    });
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching all comments:', error);
    res.status(500).json({ error: 'Error fetching all comments' });
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
