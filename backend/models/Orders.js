'use strict';
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Orders = db.define('order', {
  quantity: DataTypes.INTEGER,
  price: DataTypes.DECIMAL(18, 2),
  isExpired: DataTypes.BOOLEAN,
  orderDate: DataTypes.DATE,
  userId: DataTypes.INTEGER,
  productId: DataTypes.INTEGER,
  warehouseId: DataTypes.INTEGER,
  paymentStatus: DataTypes.BOOLEAN,
  paymentType: DataTypes.STRING,
  merchant: DataTypes.STRING,
  updateBy: DataTypes.INTEGER
}, {
  freezeTableName: true
});

export default Orders; 