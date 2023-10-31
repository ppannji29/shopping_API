'use strict';
import { Sequelize } from 'sequelize';
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('user', {
  fullname: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  otp: DataTypes.INTEGER,
  isRegistered: DataTypes.BOOLEAN,
  failCount: DataTypes.INTEGER,
  refreshToken: DataTypes.STRING,
  createdBy: DataTypes.INTEGER,
  modifiedBy: DataTypes.INTEGER
}, {
  freezeTableName: true
});

// Users.associate = (models) => {
//   Users.hasOne(models.UserProfile, { foreignKey: 'userId' });
// };

export default Users;