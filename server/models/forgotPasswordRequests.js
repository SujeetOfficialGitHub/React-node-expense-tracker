const {DataTypes} = require('sequelize')
const sequelize = require('../util/database')
const User = require('../models/user')


const ForgotPasswordRequest = sequelize.define('ForgotPasswordRequest', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
});

User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);
  
module.exports = ForgotPasswordRequest;