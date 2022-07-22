'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subscription.belongsTo(models.User, {foreignKey: 'idUser'})
      Subscription.belongsTo(models.Role, {foreignKey: 'idProject'})
      Subscription.hasMany(models.Donation, {as: 'donations'})
    }
  }
  Subscription.init({
    idUser: {
      allowNull: false,
      primaryKey: true,
      onDelete: "cascade",
      onUpdate: "cascade",
      type: DataTypes.UUID
    },
    idProject: {
      allowNull: false,
      primaryKey: true,
      onDelete: "cascade",
      onUpdate: "cascade",
      type: DataTypes.UUID
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    deletedAt: {
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'Subscription',
    timestamps: false,
    freezeTableName: true,
    tableName: 'Subscription',
    classMethods: {}
  });
  return Subscription;
};