const Sequelize = require("sequelize");
const dbConfig = require("../config/database.js");

const User = require('../models/User.js')
const Post = require('../models/Post.js')
const Like = require('../models/Like.js')
const Comment = require('../models/Comment.js')



const connection = new Sequelize(dbConfig);

User.init(connection)
Post.init(connection)
Like.init(connection)
Comment.init(connection)

module.exports = connection;