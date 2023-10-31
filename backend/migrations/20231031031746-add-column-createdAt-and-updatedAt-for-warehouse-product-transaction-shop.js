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
    await queryInterface.addColumn('Warehouse', 'createdAt', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('Warehouse', 'updatedAt', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('Product', 'createdAt', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('Product', 'updatedAt', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('Shop', 'createdAt', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('Shop', 'updatedAt', {
      type: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Warehouse', 'createdAt');
    await queryInterface.removeColumn('Warehouse', 'updatedAt');
    await queryInterface.removeColumn('Product', 'createdAt');
    await queryInterface.removeColumn('Product', 'updatedAt');
    await queryInterface.removeColumn('Shop', 'createdAt');
    await queryInterface.removeColumn('Shop', 'updatedAt');
  }
};
