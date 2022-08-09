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
        as: 'users',
        foreignKey: {
          name: 'idTech',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
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
    photo: DataTypes.STRING,
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    type: {
        allowNull: false,
        type: DataTypes.STRING
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