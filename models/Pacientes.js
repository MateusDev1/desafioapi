const db = require('../database');
const { DataTypes } = require("sequelize");

const Pacientes = db.define(
    "Pacientes",
    {
        id: {type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        data_nascimento: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 1,
         },
        createdAt:{
            type: DataTypes.DATE,
        },
        updatedAt:{
            type: DataTypes.DATE,
        },
    },
        {
            tableName: "pacientes"
        }
    );

    module.exports = Pacientes;