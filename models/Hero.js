'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Hero extends Model {
    static associate(models) {
      Hero.belongsToMany(models.Superpower, {
        through: 'powers_to_heroes',
        foreingKey: 'hero_id'
      });
      Hero.belongsToMany(models.Image, {
        through: 'images_to_heroes',
        foreingKey: 'hero_id'
      });  
    }
  }
  Hero.init({
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    realName: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    originDescription: {
      type: DataTypes.TEXT,
    },
    cathPhrase: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Hero',
    tableName: 'heroes',
    underscored: true,
    timestamps: false
  });
  return Hero;
};
/*
User.belongsToMany(models.Superheroes, {
  through: 'powers_to_heroes',
  foreingKey: 'heroId'
});
*/