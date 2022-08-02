'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Participation', {
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
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      endDate: Sequelize.DATE,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Participation');
  }
};