'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('powers_to_heroes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      heroId: {
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
      powerId: {
        field: 'power_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'superpowers',
            key: 'id'
          },
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
     })
  },
  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('powers_to_heroes');
  }
};

