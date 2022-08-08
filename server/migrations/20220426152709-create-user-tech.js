'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserTech', {
      idUser: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: 'User',
          key: 'id',
          as: 'idUser'
        }
      },
      idTech: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: 'Tech',
          key: 'id',
          as: 'idTech'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserTech');
  }
};