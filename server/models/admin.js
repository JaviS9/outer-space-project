const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (admin, options) {
  const SALT_FACTOR = 10
  if (!admin.changed('password')) {
    return;
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(admin.password, salt, null))
    .then(hash => {
      admin.setDataValue('password', hash)
    })
}

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Admin.init({
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
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
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
  }, 
  {
    sequelize,
    modelName: 'Admin',
    timestamps: true,
    freezeTableName: true,
    tableName: 'Admin',
    classMethods: {},
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeBulkCreate: hashPassword,
    }
  });

  Admin.prototype.comparePassword = function(password) {
    return bcrypt.compareAsync(password, this.password)
  }

  return Admin;
};