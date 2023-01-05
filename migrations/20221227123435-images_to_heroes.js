'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('images_to_heroes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      heroId: {
        field: 'hero_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'heroes',
            key: 'id'
          },
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      imageId: {
        field: 'image_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'images',
            key: 'id'
          },
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
     })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('images_to_heroes');
  }
};
