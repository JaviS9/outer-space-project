'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Donation.belongsTo(models.Subscription, {foreignKey: 'idSubscription', targetKey: 'numSubs'})
    }
  }
  Donation.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    idSubscription: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    cardName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    cardNumber: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    cardExpirationDate: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    donation: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
  }, {
    sequelize,
    modelName: 'Donation',
    timestamps: false,
    freezeTableName: true,
    tableName: 'Donation',
    classMethods: {}
  });
  return Donation;
};