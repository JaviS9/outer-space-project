'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Update', {
      idProject: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Project',
          key: 'id'
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      update: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Update');
  }
};