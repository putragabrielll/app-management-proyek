const projectsRouter = require("express").Router();

projectsController = require("../../controllers/projects.controller");
TugasController = require("../../controllers/tugas.controller");

// End point Project
projectsRouter.get("/", projectsController.allProject);
projectsRouter.get("/:id", projectsController.oneProject);
projectsRouter.put("/:id", projectsController.updateProject);
projectsRouter.post("/", projectsController.createProject);
projectsRouter.delete("/:id", projectsController.deleteProject);

// End point Tugas
projectsRouter.get("/:projectId/tasks", TugasController.allTugasbyProject);
projectsRouter.get("/:projectId/tasks/waiting", TugasController.tugasNotCompletedbyProject);
projectsRouter.post("/:projectId/tasks", TugasController.createTugasbyProject);

module.exports = projectsRouter;