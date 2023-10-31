'use strict';
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Warehouses = db.define('warehouse', {
  warehouseName: DataTypes.STRING,
  productId: DataTypes.INTEGER,
  location: DataTypes.STRING,
  stock: DataTypes.INTEGER,
  status: DataTypes.BOOLEAN,
}, {
  freezeTableName: true
});

export default Warehouses;