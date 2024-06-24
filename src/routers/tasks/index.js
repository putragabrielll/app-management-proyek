const tasksRouter = require("express").Router();

TugasController = require("../../controllers/tugas.controller");

tasksRouter.put("/:id", TugasController.updateTugas); // End point update tugas
tasksRouter.delete("/:id", TugasController.deleteTugas); // End point delete tugas

module.exports = tasksRouter