const {DataTypes}  = require('sequelize');
const sequelize = require('../util/database')

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

module.exports = Expense;