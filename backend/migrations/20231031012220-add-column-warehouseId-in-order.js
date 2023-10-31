'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Order', 'warehouseId', {
      type: Sequelize.INTEGER,
      foreignKey: 'warehouseId',
      references: {
        model: 'Warehouse',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('Order', 'warehouseId', {
      type: 'foreign key',
    });
    await queryInterface.removeColumn('Order', 'warehouseId');
  }
};
