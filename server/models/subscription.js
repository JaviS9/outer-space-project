'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subscription.belongsTo(models.User, {foreignKey: 'idUser', targetKey: 'id'})
      Subscription.belongsTo(models.Project, {foreignKey: 'idProject', targetKey: 'id'})
      Subscription.hasMany(models.Donation, {foreignKey: {
                                              name: 'idSubscription',
                                              onDelete: 'CASCADE',
                                              onUpdate: 'CASCADE'
                                            }});
    }
  }
  Subscription.init({
    idUser: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    idProject: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    numSubs: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    deletedAt: {
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'Subscription',
    timestamps: false,
    freezeTableName: true,
    tableName: 'Subscription',
    classMethods: {}
  });
  return Subscription;
};