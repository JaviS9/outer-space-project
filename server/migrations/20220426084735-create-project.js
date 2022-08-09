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
        type: Sequelize.UUID,
        references: {
          model: 'User',
          key: 'id',
          as: 'projectFounder'
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      title: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      photo: Sequelize.STRING,
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