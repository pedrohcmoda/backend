const Sequelize = require("sequelize"); 
const dbConfig = require("../config/database.js");

const User = require('../models/User.js') 
const Post = require('../models/Post.js') 
const Like = require('../models/Like.js') 
const Comment = require('../models/Comment.js')

const connection = new Sequelize(dbConfig);

User.init(connection, User); 
Post.init(connection, Post); 
Like.init(connection, Like); 
Comment.init(connection, Comment);

User.associate(connection.models); 
Post.associate(connection.models); 
Like.associate(connection.models); 
Comment.associate(connection.models);

module.exports = connection;