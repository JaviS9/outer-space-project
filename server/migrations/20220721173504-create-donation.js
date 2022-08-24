'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Donation', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      idSubscription: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Subscription',
          key: 'numSubs',
          as: 'idSubscription'
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      cardName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cardNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cardExpirationDate: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      date: {
        allowNull: false,
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