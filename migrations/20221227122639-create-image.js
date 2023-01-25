'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imagePath: {
        field: "image_path",
        type: Sequelize.STRING,
        allowNull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('images');
  }
};