'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ArtistaDiscos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ArtistaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Artistas', // Referencia a tabela 'Artistas'
          key: 'id',         // A coluna 'id' da tabela referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      DiscoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Discos',   // Referencia a tabela 'Discos'
          key: 'id',         // A coluna 'id' da tabela referenciada
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
    await queryInterface.dropTable('ArtistaDiscos');
  },
};
