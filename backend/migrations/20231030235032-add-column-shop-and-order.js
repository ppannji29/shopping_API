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
    await queryInterface.addColumn('Order', 'paymentStatus', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
    await queryInterface.addColumn('Order', 'paymentType', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Order', 'merchant', {
      type: Sequelize.STRING
    });
    await queryInterface.addIndex('Order', ['paymentStatus'], {
      name: 'unique_field_order_paymentStatus_index'
    });
    await queryInterface.addIndex('Order', ['paymentType'], {
      name: 'unique_field_order_paymentType_index'
    });
    await queryInterface.addIndex('Order', ['merchant'], {
      name: 'unique_field_order_merchant_index'
    });

    await queryInterface.addColumn('Shop', 'warehouseId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Warehouse',
        key: 'id',
      },
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Order', 'paymentStatus');
    await queryInterface.removeColumn('Order', 'paymentType');
    await queryInterface.removeColumn('Order', 'merchant');
    await queryInterface.removeColumn('Shop', 'warehouseId');
  }
};
