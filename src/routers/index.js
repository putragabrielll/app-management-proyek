const router = require("express").Router();

router.use("/projects", require("./projects/index")); // list End point yang berhubungan dengan project
router.use("/tasks", require("./tasks/index")); // list End point yang berhubungan dengan tugas

module.exports = router;