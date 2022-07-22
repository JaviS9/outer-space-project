'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Project', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      projectFounder: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: 'User',
          key: 'id'
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: Sequelize.STRING,
      repository: Sequelize.STRING,
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      endDate: Sequelize.DATE,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Project');
  }
};