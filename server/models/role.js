'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.belongsToMany(models.User, {
        through: 'UserRole',
        as: 'users',
        foreignKey: 'idRole'
      });
    }
  }
  Role.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.UUID
    },
    description: {
        allowNull: false,
        type: DataTypes.UUID
    }
  }, {
    sequelize,
    modelName: 'Role',
    freezeTableName: true,
    timestamps: false,
    tableName: 'Role',
    classMethods: {}
  });
  return Role;
};