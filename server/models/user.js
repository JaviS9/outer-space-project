'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Project, {foreignKey: {
                                      name: 'projectFounder',
                                      onDelete: 'CASCADE',
                                      onUpdate: 'CASCADE'
                                    }});
      User.belongsToMany(models.Project, {
        through: 'Participation',
        as: 'participation',
        foreignKey: 'idUser'
      });
      User.belongsToMany(models.Role, {
        through: 'UserRole',
        as: 'roles',
        foreignKey: 'idUser'
      });
      User.belongsToMany(models.Project, {
        through: 'Subscription',
        as: 'projectsSubscribed',
        foreignKey: 'idUser'
      });
      // User.belongsTo(models.Company, {foreignKey: 'idCompany'})
    }
  }
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    photo: DataTypes.BLOB,
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    nickName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    biography: DataTypes.STRING,
    user_status: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }

  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
    freezeTableName: true,
    tableName: 'User',
    classMethods: {}
  });
  return User;
};