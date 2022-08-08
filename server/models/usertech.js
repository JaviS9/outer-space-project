'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTech extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserTech.belongsTo(models.User, {foreignKey: 'idUser', targetKey: 'id'})
      UserTech.belongsTo(models.Tech, {foreignKey: 'idTech', targetKey: 'id'})
    }
  }
  UserTech.init({
    // idUser: {
    //   allowNull: false,
    //   primaryKey: true,
    //   onDelete: "CASCADE",
    //   onUpdate: "CASCADE",
    //   type: DataTypes.UUID
    // },
    // idTech: {
    //   allowNull: false,
    //   primaryKey: true,
    //   onDelete: "CASCADE",
    //   onUpdate: "CASCADE",
    //   type: DataTypes.INTEGER
    // },
  }, {
    sequelize,
    modelName: 'UserTech',
    timestamps: false,
    freezeTableName: true,
    tableName: 'UserTech',
    classMethods: {}
  });
  return UserTech;
};