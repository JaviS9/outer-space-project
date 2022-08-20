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
      Donation.belongsTo(models.Subscription, {foreignKey: 'idUser', targetKey: 'idUser'})
      Donation.belongsTo(models.Subscription, {foreignKey: 'idProject', targetKey: 'idProject'})
    }
  }
  Donation.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
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