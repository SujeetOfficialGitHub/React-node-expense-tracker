const {DataTypes}  = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');

const Expense = sequelize.define('expense', {
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

User.hasMany(Expense);
Expense.belongsTo(User);

module.exports = Expense;