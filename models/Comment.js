const { Model, DataTypes } = require('sequelize');

class Comment extends Model {
  static init(sequelize) {
    return super.init({
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, { sequelize });
  }

  static associate(models) {
    Comment.belongsTo(models.Post, { foreignKey: 'post_id' });
    Comment.belongsTo(models.User, { foreignKey: 'users_id' });
  }
}

module.exports = Comment;