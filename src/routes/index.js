const express = require("express");
const psicologosControler = require("../controllers/psicologoControllers");
const pacientesController = require("../controllers/pacientesController");
const atendimentosController = require("../controllers/atendimentosController");
const authController = require("../controllers/authController");
const dashboardController = require("../controllers/dashboardController");
const validadorDeLogin = require("../validators/login/validatorDeLogin");
const validadorDeId = require("../validators/id/validadorDeId");
const auth = require("../middlewares/auth");
const validationPsicologo = require("../validators/psicologos/validationPsicologo");
const validationPaciente = require("../validators/pacientes/validationPacientes");
const routes = express.Router();

routes.post("/login", validadorDeLogin, authController.login);

routes.post("/psicologos", validationPsicologo, psicologosControler.cadastrarPsicologo);
routes.get("/psicologos", psicologosControler.listarPsicologo);
routes.get("/psicologo/:id", validadorDeId, psicologosControler.showPsicologo);
routes.put("/psicologo/:id", validationPsicologo, validadorDeId, psicologosControler.atualizarPsicologo);
routes.delete("/psicologo/:id", validadorDeId, psicologosControler.deletarPsicologo);

routes.get("/pacientes", pacientesController.listarPacientes);
routes.get("/pacientes/:id", validadorDeId, pacientesController.listarPacientes);
routes.post("/pacientes/criar", validationPaciente, pacientesController.cadastrarPacientes);
routes.delete("/pacientes/:id", validadorDeId, pacientesController.deletarPacientes);
routes.put("/pacientes/:id",validadorDeId,pacientesController.atualizarPacientes);

routes.get("/atendimentos", atendimentosController.listarAtendimentos);
routes.get("/atendimentos/:id", validadorDeId, atendimentosController.listarAtendimentos);
routes.post("/atendimentos", auth, atendimentosController.cadastraratendimentos);

routes.get("/dashboards/psicologos", dashboardController.totalPsicologos);
routes.get("/dashboards/pacientes", dashboardController.totalPacientes);
routes.get("/dashboards/atendimentos", dashboardController.totalAtendimentos);
routes.get("/dashboards/media-atendimentos", dashboardController.mediaAtendimentos);

module.exports = routes;