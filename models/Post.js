const { Model, DataTypes } = require('sequelize');

class Post extends Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ingredients: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      picture: {
        type: DataTypes.BLOB('medium'),
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      users_id: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, { sequelize});
  }

  static associate(models) {
    Post.belongsTo(models.User, { 
      foreignKey: 'users_id',
      as: 'users',
    });
    Post.hasMany(models.Comment, {
      foreignKey: 'post_id',
      as: 'comments',
    });
    Post.hasMany(models.Like, {
      foreignKey: 'post_id',
      as: 'likes',
    });
  }

}




module.exports = Post;