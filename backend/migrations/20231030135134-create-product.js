'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Product', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.DECIMAL(18, 2)
      }
    });
    await queryInterface.addIndex('Product', ['id'], {
      name: 'unique_field_product_id_index',
      unique: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Product');
  }
};