'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    password: DataTypes.INTEGER,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    birth: DataTypes.INTEGER,
    mobile: DataTypes.INTEGER,
    image: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};