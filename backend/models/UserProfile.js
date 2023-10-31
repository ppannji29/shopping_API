'use strict';
import { Sequelize } from 'sequelize';
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const UserProfile = db.define('userprofile', {
  identityNumber: DataTypes.STRING,
  address: DataTypes.TEXT,
  domicile: DataTypes.TEXT,
  job: DataTypes.STRING,
  userCompany: DataTypes.STRING,
  dateOfBirth: DataTypes.DATE,
  phoneNumber: DataTypes.STRING,
  createdBy: DataTypes.INTEGER,
  modifiedBy: DataTypes.INTEGER,
  userId: DataTypes.INTEGER
}, {
  freezeTableName: true
});

export default UserProfile;