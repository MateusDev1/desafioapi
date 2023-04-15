const { Atendimentos, Psicologos, Pacientes } = require("../models");

const atendimentosController = {
  async listarAtendimentos(req, res) {
    try {
      const { id } = req.params;
      const { psicologo_id, paciente_id } = req.body;
      if (!id) {
        const listaDeAtendimentos = await Atendimentos.findAll({
          include: [
            { model: Pacientes, attributes: { exclude: ["status"] } },
            { model: Psicologos, attributes: { exclude: ["senha", "status"] } },
          ],
        });

        res.json(listaDeAtendimentos);
      } else {
        const { id } = req.params;
        const listaDeAtendimentos = await Atendimentos.findAll({
          where: { id },
          include: [
            { model: Pacientes, attributes: { exclude: ["status"] } },
            { model: Psicologos, attributes: { exclude: ["senha", "status"] } },
          ],
        });

        res.json(listaDeAtendimentos);
      }
    } catch {
      res.status(500).json(`ERRO`);
    }
  },

  async cadastraratendimentos(req, res) {
    try {
      const { psicologo_id, paciente_id, data_atendimento, observacao } =
        req.body;

      if (!paciente_id || !data_atendimento || !observacao) {
        return res.status(400).json("Preencha todos os campos");
      }

      const pacienteExiste = await Pacientes.count({
        where: {
          id: paciente_id,
        },
      });

      if (!pacienteExiste) {
        return res.status(400).json("Paciente não encontrado");
      }

      const psicologoExiste = await Psicologos.count({
        where: {
          id: psicologo_id,
        },
      });
      if (!psicologoExiste) {
        return res.status(400).json("Psicologo não encontrado");
      }
      const novoAtendimento = await Atendimentos.create({
        psicologo_id,
        paciente_id,
        data_atendimento,
        observacao,
      });
      return res.status(201).json(novoAtendimento);
    } catch (error) {
      console.log(error);
      res.status(500).json("Erro interno no servidor");
    }
  },
};
module.exports = atendimentosController;
