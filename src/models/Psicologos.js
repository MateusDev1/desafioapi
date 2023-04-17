// importando a conexão com o banco de dados
const db = require("../database/index")

// importando os type: tipos de sequelize
const { DataTypes } = require("sequelize")

const Psicologos = db.define("Psicologos", {

    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    senha: {
        type: DataTypes.STRING,
    },
    apresentacao: {
        type: DataTypes.STRING,
    },

    createdAt: { 
        type: DataTypes.DATE,
    },
    updatedAt: { 
        type: DataTypes.DATE,
    },
}, {    
    tableName: "psicologos",
})

// agora que o modelo foi criado vamos exportar a estrutura Produtos
module.exports = Psicologos  
