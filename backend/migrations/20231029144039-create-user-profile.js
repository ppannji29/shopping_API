'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserProfile', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      identityNumber: {
        type: Sequelize.STRING,
        unique: true,
      },
      address: {
        type: Sequelize.TEXT,
      },
      domicile: {
        type: Sequelize.TEXT,
      },
      job: {
        type: Sequelize.STRING,
      },
      userCompany: {
        type: Sequelize.STRING,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
      },
      phoneNumber: {
        type: Sequelize.STRING(20)
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
    await queryInterface.addIndex('UserProfile', ['identityNumber'], {
      name: 'unique_field_user_profile_identityNumber_index',
      unique: true,
    });
    await queryInterface.addIndex('UserProfile', ['userId'], {
      name: 'unique_field_user_profile_userId_index',
      unique: true,
    });
    await queryInterface.addIndex('UserProfile', ['id'], {
      name: 'unique_field_user_profile_id_index',
      unique: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('UserProfile', 'userId', {
      type: 'foreign key',
    });
    await queryInterface.dropTable('UserProfile');
  }
};