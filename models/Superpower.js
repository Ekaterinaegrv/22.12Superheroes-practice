'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superpower extends Model {
    
    static associate(models) {
      Superpower.belongsToMany(models.Hero, {
        through: 'powers_to_heroes',
        foreingKey: 'superpower_id'
      });
    }
  }
  Superpower.init({
    superpower: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Superpower',
    tableName: 'superpowers',
    underscored: true,
    timestamps: false
  });
  return Superpower;
};