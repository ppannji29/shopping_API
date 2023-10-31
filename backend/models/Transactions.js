'use strict';
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Transactions = db.define('transaction', {
  userId: Sequelize.INTEGER,
  productId: Sequelize.INTEGER,
  orderId: Sequelize.INTEGER,
  amount: Sequelize.DECIMAL(18, 2),
  paymentStatus: Sequelize.STRING,
  paymentType: Sequelize.STRING,
  merchant: Sequelize.STRING,
}, {
  freezeTableName: true
});

export default Transactions; 