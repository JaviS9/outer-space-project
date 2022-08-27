'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Friend', {
      idUser1: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: 'User',
          key: 'id',
          as: 'idUser1'
        }
      },
      idUser2: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: 'User',
          key: 'id',
          as: 'idUser2'
        }
      },
      request: {
        allowNull:false,
        type: Sequelize.STRING,
      },
      accepted: {
        type: Sequelize.BOOLEAN,
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      endDate: Sequelize.DATE,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Friend');
  }
};