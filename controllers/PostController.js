/* eslint-disable no-unused-vars */
const Post = require('../models/Post.js');
const User = require('../models/User.js');
const Like = require('../models/Like.js');
const Comment = require('../models/Comment.js');


module.exports = {
  async store(req, res) {
    try {
      const postar = await Post.create(req.body);
      res.status(201).json({ message: 'Post created successfully', data: postar });
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ message: 'Error creating post', error: error.message });
    }
  },

  async index(req, res) {
    try {
      const posts = await Post.findAll({
        include:   Comment
    });
      res.status(200).json({ message: 'Posts retrieved successfully', data: posts });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving posts', error: error.message });
    }
  },

  async indexOne(req, res) {
    try {
      const posts = await Post.findByPk(req.params, {include: Comment});
      res.status(200).json({ message: 'Posts retrieved successfully', data: posts });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving posts', error: error.message });
    }
  },

  async update(req, res) {
    try {
      const post = await Post.findByPk(req.params.id);
      if (post) {
        await post.update(req.body);
        res.status(200).json({ message: 'Post updated successfully', data: post });
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating post', error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const post = await Post.findByPk(req.params.id);
      if (post) {
        await post.destroy();
        res.status(200).json({ message: 'Post deleted successfully' });
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
  },
};