const projectsRouter = require("express").Router();

projectsController = require("../../controllers/projects.controller");
TugasController = require("../../controllers/tugas.controller");

// End point Project
projectsRouter.get("/", projectsController.allProject); // End point keseluruhan project
projectsRouter.get("/:id", projectsController.oneProject); // End point satu project
projectsRouter.put("/:id", projectsController.updateProject); // End point update project
projectsRouter.post("/", projectsController.createProject); // End point create project
projectsRouter.delete("/:id", projectsController.deleteProject); // End point delete project

// End point Tugas
projectsRouter.get("/:projectId/tasks", TugasController.allTugasbyProject); // End point keseluruhan tugas berdasarkan id project
projectsRouter.get("/:projectId/tasks/waiting", TugasController.tugasNotCompletedbyProject); // End point tugas yang belum selesai berdasarkan id project
projectsRouter.post("/:projectId/tasks", TugasController.createTugasbyProject); // End point create tugas berdasarkan id project

module.exports = projectsRouter;