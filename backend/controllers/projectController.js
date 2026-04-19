const projectModel = require("../models/projectModel");

async function getProjects(_req, res, next) {
  try {
    const projects = await projectModel.getAllProjects();

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
}

async function createProject(req, res, next) {
  try {
    const projectId = await projectModel.createProject(req.body);

    res.status(201).json({
      success: true,
      message: "Project created successfully.",
      data: { id: projectId },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProjects,
  createProject,
};
