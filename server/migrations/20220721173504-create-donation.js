'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Donation', {
      idUser: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: 'Subscription',
          key: 'idUser',
          as: 'idUser'
        },
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
      },
      idProject: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: 'Subscription',
          key: 'idProject',
          as: 'idProject'
        },
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
      },
      date: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      donation: {
        allowNull: false,
        type: Sequelize.FLOAT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Donation');
  }
};