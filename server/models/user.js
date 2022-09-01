const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8
  if (!user.changed('password')) {
    return;
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

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
      User.hasMany(models.Project, {
        foreignKey: {
        name: 'projectFounder',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }});
      User.belongsToMany(models.Tech, {
        through: 'UserTech',
        as: 'techs',
        foreignKey: {
          name: 'idUser',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      });
      User.belongsToMany(models.Project, {
        through: 'Subscription',
        as: 'projectsSubscribed',
        foreignKey: {
          name: 'idUser',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      });
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
    photo: DataTypes.STRING,
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    nickName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    biography: DataTypes.STRING,
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
    classMethods: {},
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeBulkCreate: hashPassword,
    }
  });

  User.prototype.comparePassword = function(password) {
    return bcrypt.compareAsync(password, this.password)
  }

  return User;
};