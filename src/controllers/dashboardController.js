
// Importando os modelos e bibliotecas necessárias
const Atendimentos = require("../models/Atendimentos");
const Pacientes = require("../models/Pacientes");
const Psicologos = require("../models/Psicologos");

const dashboardController = {
  async totalAtendimentos(req, res) {

    try {
      const numeroDeAtendimentos = await Atendimentos.count();

      return res.status(200).json(numeroDeAtendimentos);
    }
    catch (error) {
      console.error(error);
      return res.status(500).json("Erro interno no servidor!");
    }
  },

  async mediaAtendimentos(req, res) {

    try {

      const numeroDeAtendimentos = await Atendimentos.count();
      const numeroDePsicologos = await Psicologos.count();

      const media = (numeroDeAtendimentos / numeroDePsicologos).toFixed(2); 
      const numeroMedia = parseFloat(media); 

      return res.status(200).json(numeroMedia);
    }
    catch (error) {
      console.error(error);
      return res.status(500).json("Erro interno no servidor!");
    }
  },

  async totalPacientes(req, res) {

    try {
      const numeroDePacientes = await Pacientes.count();

      return res.status(200).json(numeroDePacientes);
    }
    catch (error) {

      console.error(error);
      return res.status(500).json("Erro interno no servidor!");
    }
  },

  async totalPsicologos(req, res) {

    try {

      const numeroDePsicologos = await Psicologos.count();

      return res.status(200).json(numeroDePsicologos);

    }
    catch (error) {

      console.error(error);
      return res.status(500).json("Erro interno no servidor!");

    }
  },

};

module.exports = dashboardController;