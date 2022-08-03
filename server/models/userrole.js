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
      UserRole.belongsTo(models.User, {foreignKey: 'idUser', targetKey: 'id'})
      UserRole.belongsTo(models.Role, {foreignKey: 'idRole', targetKey: 'id'})
    }
  }
  UserRole.init({
    // idUser: {
    //   allowNull: false,
    //   primaryKey: true,
    //   onDelete: "CASCADE",
    //   onUpdate: "CASCADE",
    //   type: DataTypes.UUID
    // },
    // idRole: {
    //   allowNull: false,
    //   primaryKey: true,
    //   onDelete: "CASCADE",
    //   onUpdate: "CASCADE",
    //   type: DataTypes.INTEGER
    // },
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