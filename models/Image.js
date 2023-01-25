'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsToMany(models.Hero, {
        through: 'images_to_heroes',
        foreingKey: 'image_id'
      });    }
  }
  Image.init({
    imagePath: {
      field: "image_path",
      type: DataTypes.STRING,
      allowNull: false

    }
  }, {
   
    sequelize,
    modelName: 'Image',
    tableName: 'images',
    underscored: true,
    timestamps: false
  });
  return Image;
};