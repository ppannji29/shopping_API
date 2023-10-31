'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Shop', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Product',
          key: 'id',
        },
      },
      totalPrice: {
        type: Sequelize.DECIMAL(18, 2)
      },
      isExpired: {
        type: Sequelize.BOOLEAN
      },
      orderDate: {
        type: Sequelize.DATE
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      paymentStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      paymentType: {
        type: Sequelize.STRING
      },
      merchant: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        foreignKey: 'userId',
        references: {
          model: 'User',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    });
    await queryInterface.addIndex('Shop', ['id'], {
      name: 'unique_field_shop_id_index',
      unique: true,
    });
    await queryInterface.addIndex('Shop', ['userId'], {
      name: 'unique_field_shop_userId_index'
    });
    await queryInterface.addIndex('Shop', ['merchant'], {
      name: 'unique_field_shop_merchant_index'
    });
    await queryInterface.addIndex('Shop', ['paymentType'], {
      name: 'unique_field_shop_paymentType_index'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Shop', 'userId', {
      type: 'foreign key',
    });
    await queryInterface.dropTable('Shop');
  }
};