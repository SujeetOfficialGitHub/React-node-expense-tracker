const {DataTypes}  = require('sequelize');
const sequilize = require('../util/database')

const User = sequilize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNUll: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNUll: false
    }
})

module.exports = User;