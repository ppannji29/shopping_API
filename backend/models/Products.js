'use strict';
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Products = db.define('product', {
  productName: DataTypes.STRING,
  stock: DataTypes.INTEGER,
  price: DataTypes.DECIMAL(18, 2)
}, {
  freezeTableName: true
});

export default Products; 