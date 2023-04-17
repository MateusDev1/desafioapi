"use strict";

const sequelize = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("psicologos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING(255),
      },
      email: {
        type: Sequelize.STRING(255),
        unique: true,
      },
      senha: {
        type: Sequelize.STRING(255),
      },
      apresentacao: {
        type: Sequelize.STRING(255),
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("psicologos");
  },
};
