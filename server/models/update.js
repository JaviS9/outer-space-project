'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Update extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Update.belongsTo(models.Project, {foreignKey: 'idProject', targetKey: 'id'})
    }
  }
  Update.init({
    idProject: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    update_date: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Update',
    timestamps: false,
    freezeTableName: true,
    tableName: 'Update',
    classMethods: {}
  });
  return Update;
};