const router = require("express").Router();

router.use("/projects", require("./projects/index"));
router.use("/tasks", require("./tasks/index"));

module.exports = router;