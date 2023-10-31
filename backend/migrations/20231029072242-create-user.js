'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      otp: {
        type: Sequelize.INTEGER,
      },
      isRegistered: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      failCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      modifiedBy: {
        type: Sequelize.INTEGER
      }
    });

    await queryInterface.addIndex('User', ['id'], {
      name: 'unique_field_user_id_index',
      unique: true,
    });

    await queryInterface.addIndex('User', ['email'], {
      name: 'unique_field_user_email_index',
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User');
  },
};
