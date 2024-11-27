'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Discos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            titulo: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ano: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            capa: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            faixas: {
                type: Sequelize.JSON,
                allowNull: true,
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
        await queryInterface.dropTable('Discos');
    },
};
