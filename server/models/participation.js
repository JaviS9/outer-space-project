'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Participation.belongsTo(models.User, {foreignKey: 'idUser'})
      Participation.belongsTo(models.Project, {foreignKey: 'idProject'})
    }
  }
  Participation.init({
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
    startDate: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    endDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Participation',
    timestamps: false,
    freezeTableName: true,
    tableName: 'PArticipation',
    classMethods: {}
  });
  return Participation;
};