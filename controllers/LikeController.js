const Like = require('../models/Like.js');

module.exports = {

  // Like a post (consider authorization)
  async likePost(req, res) {
    const { post_id } = req.params;
    const users_id = req.body.user_id;
    try {
      const existingLike = await Like.findOne({ where: { post_id, users_id } });

      if (existingLike) {
        await existingLike.destroy();
        return res.status(200).json({ message: 'Post unliked successfully' });
      }

      const newLike = await Like.create({ post_id, users_id });
      return res.status(201).json({ message: 'Post liked successfully', like: newLike });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error liking post' });
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
