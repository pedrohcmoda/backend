/* eslint-disable no-unused-vars */
const Post = require('../models/Post.js');
const Like = require('../models/Like.js');
const Comment = require('../models/Comment.js');
const Sequelize = require('sequelize');
const fs = require('fs');

module.exports = {

  async store(req, res) {
    console.log(req.file);
    console.log(req.file.filename);
  
    try {
      const imageData = fs.readFileSync(`./uploads/${req.file.filename}`, { encoding: 'base64' });
      const postData = {
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        price: req.body.price,
        picture: imageData,
        users_id: req.body.users_id,
      };
  
      const createdPost = await Post.create(postData);
      res.status(201).json({ message: 'Post created successfully!', data: createdPost });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Error creating post', error: error.message });
    }
  },

  async index(req, res) {
    try {
      const posts = await Post.findAll({
        include: [
          {
            model: Comment,
            as: 'comments'
          },
          {
            model: Like,
            as: 'likes',
            attributes: []
          },
        ],
        attributes: {
          include: [
            [Sequelize.fn('COUNT', Sequelize.col('likes.id')), 'likeCount'],
            [Sequelize.col('comments.id'), 'commentId']
          ]
        },
        group: ['Post.id', 'comments.id']
      });
      try{
        for (const post of posts) {
          post.picture = post.picture.toString('base64'); 
          post.picture = atob(post.picture);
          post.picture = `data:image/png;base64,${post.picture}`;
        }
      }catch (error) {
        console.error(error.message);
      }
      res.status(200).json({ message: 'Posts retrieved successfully', data: posts });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving posts', error: error.message });
    }
  },

  async indexOne(req, res) {
    try {
      const posts = await Post.findByPk(req.params.post_id, {include: {
        model: Comment,
        as: 'comments'
      }});
      posts.picture = posts.picture.toString('base64');
      posts.picture = atob(posts.picture);
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