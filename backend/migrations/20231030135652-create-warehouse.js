'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Warehouse', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      warehouseName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Product',
          key: 'id',
        },
      },
      location: {
        type: Sequelize.STRING,
      },
      stock: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Warehouse');
  }
};