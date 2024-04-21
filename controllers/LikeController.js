const Like = require('../models/Like.js');

module.exports = {

  // Like a post (consider authorization)
  async likePost(req, res) {
    const { post_id } = req.params;
    const userId = req.user.id; // Assuming user authentication

    try {
      const existingLike = await Like.findOne({ where: { post_id, userId } });

      if (existingLike) {
        return res.status(400).json({ message: 'You already liked this post' });
      }

      const newLike = await Like.create({ post_id, userId });
      return res.status(201).json({ message: 'Post liked successfully', like: newLike });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error liking post' });
    }
  },

  // Unlike a post (consider authorization)
  async unlikePost(req, res) {
    const { post_id } = req.params;
    const userId = req.user.id; // Assuming user authentication

    try {
      const likeToDelete = await Like.findOne({ where: { post_id, userId } });

      if (!likeToDelete) {
        return res.status(404).json({ message: 'You haven\'t liked this post yet' });
      }

      await likeToDelete.destroy();
      return res.status(200).json({ message: 'Post unliked successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error unliking post' });
    }
  },

  // Get all likes for a post (optional)
  async getPostLikes(req, res) {
    const { post_id } = req.params;

    try {
      const likes = await Like.findAll({ where: { post_id } });
      return res.status(200).json({ message: 'Likes retrieved successfully', likes });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error retrieving likes' });
    }
  },
};
