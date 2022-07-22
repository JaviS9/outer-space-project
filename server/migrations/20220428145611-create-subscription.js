'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subscription', {
      idUser: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: 'User',
          key: 'id'
        }
      },
      idProject: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: 'Project',
          key: 'id'
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