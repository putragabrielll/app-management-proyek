const tasksRouter = require("express").Router();

TugasController = require("../../controllers/tugas.controller");

tasksRouter.put("/:id", TugasController.updateTugas);
tasksRouter.delete("/:id", TugasController.deleteTugas);

module.exports = tasksRouter