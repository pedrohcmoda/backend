const { Model, DataTypes } = require('sequelize');

class Like extends Model {
  static init(sequelize) {
    return super.init({
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, { sequelize });
  }

  static associate(models) {
    Like.belongsTo(models.User, { foreignKey: 'users_id' });
    Like.belongsTo(models.Post, { foreignKey: 'post_id' });
  }
}

module.exports = Like;