const {Model, DataTypes} = require('sequelize')
const bcrypt = require('bcryptjs');

class User extends Model {
    static init(sequelize) {
        super.init({
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING, 
        }, {sequelize, 
            hooks: {
                beforeCreate: async (user) => {
                    const salt = bcrypt.genSaltSync();
                    user.password = await bcrypt.hashSync(user.password, salt)
                }
        }})
    }
    
}
User.associate = function(models) {

    User.hasMany(models.Post, {

    foreignKey: 'users_id',

    as: 'posts',

    });

};
module.exports = User;