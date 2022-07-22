'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserRole', {
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
      idRole: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: 'Role',
          key: 'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserRole');
  }
};