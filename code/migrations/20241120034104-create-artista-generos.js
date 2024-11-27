'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ArtistaGeneros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ArtistaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Artistas',
          key: 'id',
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE',
      },
      GeneroId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Generos', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: { 
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ArtistaGeneros');
  },
};
