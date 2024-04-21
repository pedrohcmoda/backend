const Comment = require('../models/Comment.js');
module.exports = {

  // Create a comment on a post (consider authorization)
  async createComment(req, res) {
    const { post_id } = req.params;
    const users_id = req.body.users_id; // Assuming user authentication
    const text = req.body.text
    
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    try {
      const newComment = await Comment.create({ text, users_id, post_id });
      return res.status(201).json({ message: 'Comment created successfully', comment: newComment });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error creating comment' });
    }
  },

  // Get all comments for a post (optional)
  async getPostComments(req, res) {
    const { post_id } = req.params;

    try {
      const comments = await Comment.findAll({ where: { post_id } });
      return res.status(200).json({ message: 'Comments retrieved successfully', comments });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error retrieving comments' });
    }
  },

  // Delete a comment (consider authorization)
  async deleteComment(req, res) {
    const { comment_id } = req.params;

    try {
      const commentToDelete = await Comment.findByPk(comment_id);

      if (!commentToDelete) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      await commentToDelete.destroy();
      return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error(error);

      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({ message: 'Invalid comment ID' });
      }

      return res.status(500).json({ message: 'Error deleting comment' });
    }
  }

};
