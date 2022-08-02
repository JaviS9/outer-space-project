'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserRole.belongsTo(models.User, {foreignKey: 'idUser'})
      UserRole.belongsTo(models.Role, {foreignKey: 'idRole'})
    }
  }
  UserRole.init({
    idUser: {
      allowNull: false,
      primaryKey: true,
      onDelete: "cascade",
      onUpdate: "cascade",
      type: DataTypes.UUID
    },
    idRole: {
      allowNull: false,
      primaryKey: true,
      onDelete: "cascade",
      onUpdate: "cascade",
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'UserRole',
    timestamps: false,
    freezeTableName: true,
    tableName: 'UserRole',
    classMethods: {}
  });
  return UserRole;
};