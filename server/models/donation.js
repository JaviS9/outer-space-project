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
      Donation.belongsTo(models.Subscription, {foreignKey: 'compositeFK'})
    }
  }
  Donation.init({
    idUser: {
      allowNull: false,
      primaryKey: true,
      unique: 'compositeFK',
      type: DataTypes.UUID,
    },
    idProject: {
      allowNull: false,
      primaryKey: true,
      unique: 'compositeFK',
      type: DataTypes.UUID,
    },
    date: {
      allowNull: false,
      primaryKey: true,
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