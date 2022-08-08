'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tech extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tech.belongsToMany(models.User, {
        through: 'UserTech',
        as: 'techs',
        foreignKey: 'idTech'
      });
    }
  }
  Tech.init({
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
    modelName: 'Tech',
    freezeTableName: true,
    timestamps: false,
    tableName: 'Tech',
    classMethods: {}
  });
  return Tech;
};