'use strict';
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Order = db.define('order', {
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(18, 2),
    isExpired: DataTypes.BOOLEAN,
    orderDate: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    updateAt: DataTypes.DATE,
    updateBy: DataTypes.INTEGER
}, {
    freezeTableName: true
});

export default Order; 