const express = require("express");

const projectController = require("../controllers/projectController");
const { requireAdminKey, validateProject } = require("../middleware/validate");

const router = express.Router();

router.get("/", projectController.getProjects);
router.post("/", requireAdminKey, validateProject, projectController.createProject);

module.exports = router;
