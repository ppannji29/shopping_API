'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Order', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL(18, 2)
      },
      isExpired: {
        type: Sequelize.BOOLEAN
      },
      orderDate: {
        type: Sequelize.DATE
      },
      updateAt: {
        type: Sequelize.DATE
      },
      updateBy: {
        type: Sequelize.INTEGER
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
      },
      productId: {
        type: Sequelize.INTEGER,
        foreignKey: 'productId',
        references: {
          model: 'Product',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    });
    await queryInterface.addIndex('Order', ['id'], {
      name: 'unique_field_order_id_index',
      unique: true,
    });
    await queryInterface.addIndex('Order', ['userId'], {
      name: 'unique_field_order_userId_index'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Order', 'userId', {
      type: 'foreign key',
    });
    await queryInterface.removeConstraint('Order', 'productId', {
      type: 'foreign key',
    });
    await queryInterface.dropTable('Order');
  }
};