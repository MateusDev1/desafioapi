const Pacientes  = require("../models/Pacientes");

const pacientesController = {
    
    async listarPacientes (req, res) {

     try {
        const {id} = req.params;
        if(!id){
        const listaDePacientes = await Pacientes.findAll({where: {status: 1}});

        res.json(listaDePacientes);
        } else {
            const listaDePacientes = await Pacientes.findAll({
                where: {
                    id,
                    status: 1,
                }
            });

            res.json(listaDePacientes);
        }
        }catch{
            res.status(500).json(`ERRO: ${error}`);
        }
    },

    async cadastrarPacientes (req, res) {
      

        try {
            const { nome, email, data_nascimento } = req.body;
   
            const checkEmail = await Pacientes.count({ where: { email } });
            if (checkEmail) {
               return res.status(400).json("Email já cadastrado!");
            }
   
            const usuarioCadastrado = await Pacientes.create({
               nome,
               email,
               data_nascimento,
            });
   
            res.status(201).json(usuarioCadastrado);
         } catch (error) {
            res.status(500).json(`ERRO: ${error}`);
         }
        
    },

    async deletarPacientes (req, res) {
        
        try {
            const { id } = req.params;
            const pacientes = await Pacientes.findByPk(id);

            if (!pacientes) {
               return res.status(404).json("Id não encontrado");
            }
   
            await Pacientes.update({ status: 0 }, { where: { id } });
   
            res.status(200).json("Deletado com Sucesso");

         } catch (error) {
            res.status(500).json(`ERRO: ${error}`);
         }
      },

    async atualizarPacientes (req, res) {
        try {
            const dados = req.body;
            const { id } = req.params;

            const pacientesId = await Pacientes.findByPk(id);

            if (!pacientesId) {

               return res.status(404).json("Id não encontrado");
            }
   
            if (dados.email) {
               const checkEmail = await Pacientes.count({
                  where: { email: dados.email },
               });
               if (checkEmail) {
                  return res.status(400).json("Email já cadastrado!");
               }
            }
   
            await Pacientes.update(dados, { where: { id } });
   
            const usuarioAtualizado = await Pacientes.findByPk(id);
   
            res.status(200).json(usuarioAtualizado);
         } catch (error) {
            res.status(500).json(`ERRO: ${error}`);
         }
      },
  }

module.exports = pacientesController;