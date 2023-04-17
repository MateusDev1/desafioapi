const Psicologos = require('../models/Psicologos');
const jwt = require("jsonwebtoken");
const secret = require("../configs/secret");
const bcrypt = require("bcryptjs");

const authController = {

    async login(req, res) {

        try {
            const { email, senha } = req.body;
            const psicologoLogin = await Psicologos.findOne({
                
                where: {
                    email
                }
            });

            if (!psicologoLogin || !bcrypt.compareSync(senha, psicologoLogin.senha) ){
                return res.status(401).json("E-mail ou senha inválido, tente novamente!");
            }

            const token = jwt.sign(
            {
                id: psicologoLogin.id, 
                email: psicologoLogin.email, 
                nome: psicologoLogin.nome,
            }, 
                secret.key
            );

            return res.status(200).json(token);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json("Erro interno no servidor!");
        };
    },
};

module.exports = authController;