'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subscription', {
      idUser: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: 'User',
          key: 'id',
          as: 'idUser'
        }
      },
      idProject: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: 'Project',
          key: 'id',
          as: 'idProject'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deletedAt: {
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Subscription');
  }
};