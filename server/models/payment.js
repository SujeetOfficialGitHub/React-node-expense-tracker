const {DataTypes} = require('sequelize');
const sequelize = require('../util/database');

const Payment = sequelize.define('payment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: null
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
    paymentId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orderId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order_status: {
        type: DataTypes.STRING,
        allowNull: false
    }
})


module.exports =  Payment;