const { Model, DataTypes } = require('sequelize');

class Comment extends Model {
  static init(sequelize) {
    return super.init({
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
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
    }, { sequelize , timestamps: true});
  }

  static associate(models) {
    Comment.belongsTo(models.Post, { foreignKey: 'post_id', onDelete: 'CASCADE'});
    Comment.belongsTo(models.User, { foreignKey: 'users_id', onDelete: 'CASCADE' });
  }
}

module.exports = Comment;