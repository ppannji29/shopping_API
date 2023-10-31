import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const ProductAttachment = db.define('product_attachment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER
    },
    productImage: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

export default ProductAttachment; 