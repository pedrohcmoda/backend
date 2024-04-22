const { Model, DataTypes } = require('sequelize');

class Like extends Model {
  static init(sequelize) {
    return super.init({
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, { sequelize , timestamps: false } );
  }

  static associate(models) {
    Like.belongsTo(models.User, { foreignKey: 'users_id', onDelete: 'CASCADE'});
    Like.belongsTo(models.Post, { foreignKey: 'post_id', onDelete: 'CASCADE' });
  }
}

module.exports = Like;