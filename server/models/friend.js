'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Friend.belongsTo(models.User, {foreignKey: 'idUser1', targetKey: 'id'})
      Friend.belongsTo(models.User, {foreignKey: 'idUser2', targetKey: 'id'})
    }
  }
  Friend.init({
    idUser1: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    idUser2: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    request: {
      allowNull:false,
      type: DataTypes.STRING,
    },
    accepted: {
      type: DataTypes.BOOLEAN,
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    endDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Friend',
    timestamps: false,
    freezeTableName: true,
    tableName: 'PArticipation',
    classMethods: {}
  });
  return Friend;
};