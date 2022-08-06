'use strict';
const {
  Model, BelongsTo
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.hasMany(models.Update, {foreignKey: {
                                      name: 'idProject',
                                      onDelete: 'CASCADE',
                                      onUpdate: 'CASCADE'
                                    }});
      Project.belongsToMany(models.User, {
        through: 'Participation',
        as: 'participants',
        foreignKey: {
          name: 'idProject',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      })
      Project.belongsToMany(models.User, {
        through: 'Subscription',
        as: 'usersSubscribed',
        foreignKey: {
          name: 'idProject',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      })
      Project.belongsTo(models.User, {foreignKey: 'projectFounder', targetKey: 'id'})
    }
  }
  Project.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    title: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },
    description: DataTypes.STRING,
    repository: DataTypes.STRING,
    startDate: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    endDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Project',
    timestamps: false,
    freezeTableName: true,
    tableName: 'Project',
    classMethods: {}
  });
  return Project;
};