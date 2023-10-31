'use strict';
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Shops = db.define('shop', {
  id: DataTypes.INTEGER,
  productId: DataTypes.INTEGER,
  totalPrice: DataTypes.DECIMAL(18, 2),
  isExpired: DataTypes.BOOLEAN,
  orderDate: DataTypes.DATE,
  createdBy: DataTypes.INTEGER,
  paymentStatus: DataTypes.BOOLEAN,
  paymentType: DataTypes.STRING,
  merchant: DataTypes.STRING,
}, {
  freezeTableName: true
});

export default Shops; 