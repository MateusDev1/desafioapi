// Importando os modelos e bibliotecas necessárias
const Psicologos = require('../models/Psicologos');
const jwt = require("jsonwebtoken");
const secret = require("../configs/secret");
const bcrypt = require("bcryptjs");

const authController = {
    // Definindo uma função assíncrona para o login do psicólogo
    async login(req, res) {
        try {
            // Obtendo as informações de email e senha da requisição
            const { email, senha } = req.body;
            // Buscando um psicólogo pelo email informado
            const psicologoLogin = await Psicologos.findOne({
                where: {
                    email
                }
            });

            // Verificando se o psicólogo foi encontrado e se a senha informada é válida
            if (!psicologoLogin || !bcrypt.compareSync(senha, psicologoLogin.senha)) {
                // Retornando um erro de autenticação caso as informações sejam inválidas
                return res.status(401).json("E-mail ou senha inválido, tente novamente!");
            }

            // Gerando um token JWT com as informações do psicólogo
            const token = jwt.sign(
                {
                    id: psicologoLogin.id,
                    email: psicologoLogin.email,
                    nome: psicologoLogin.nome,
                },
                secret.key
            );

            // Retornando o token JWT para o cliente
            return res.status(200).json(token);
        }
        catch (error) {
            // Em caso de erro, logar o erro e retornar um erro interno do servidor
            console.error(error);
            return res.status(500).json("Erro interno no servidor!");
        };
    },
};

// Exportando o objeto de controle de autenticação
module.exports = authController;
