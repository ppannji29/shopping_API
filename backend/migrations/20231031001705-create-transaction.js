'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transaction', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      },
      productId: {
        type: Sequelize.INTEGER,
        foreignKey: 'productId',
        references: {
          model: 'Product',
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      orderId: {
        type: Sequelize.INTEGER,
        foreignKey: 'orderId',
        references: {
          model: 'Order',
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      amount: {
        type: Sequelize.DECIMAL(18, 2)
      },
      paymentStatus: {
        type: Sequelize.STRING,
        defaultValue: "Unpaid"
      },
      paymentType: {
        type: Sequelize.STRING
      },
      merchant: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
    await queryInterface.addIndex('Transaction', ['paymentStatus'], {
      name: 'unique_field_transaction_paymentStatus_index'
    });
    await queryInterface.addIndex('Transaction', ['paymentType'], {
      name: 'unique_field_transaction_paymentType_index'
    });
    await queryInterface.addIndex('Transaction', ['merchant'], {
      name: 'unique_field_transaction_merchant_index'
    });
    await queryInterface.addIndex('Transaction', ['userId'], {
      name: 'unique_field_transaction_userId_index'
    });
    await queryInterface.addIndex('Transaction', ['orderId'], {
      name: 'unique_field_transaction_orderId_index'
    });
    await queryInterface.addIndex('UserProfile', ['phoneNumber'], {
      name: 'unique_field_userProfile_phoneNumber_index'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Transaction', 'userId', {
      type: 'foreign key',
    });
    await queryInterface.removeConstraint('Transaction', 'productId', {
      type: 'foreign key',
    });
    await queryInterface.removeConstraint('Transaction', 'orderId', {
      type: 'foreign key',
    });
    await queryInterface.dropTable('Transaction');
  }
};