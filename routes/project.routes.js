// routes/project.js
const express = require("express");
const router = express.Router();
const projectController = require("../controller/project.controller");
const authMiddleware = require("../middleware/auth");
const { projectSchema ,updateProjectSchema} = require("../middleware/joi_verification");

//=============================//
//     Joi schema Validate     //
//=============================//
const validate = (schema) => async (req, res, next) => {
  try {
    console.log("body =>", req.body);
    //validate Schema
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

////////////////////////////////////////////
// Create a new project
router.post(
  "/projects",
  validate(projectSchema),
  projectController.createProject
);

////////////////////////////////////////////
// Get project by ID
router.get("/projects/:id",authMiddleware.getProject, projectController.getProjectById);

////////////////////////////////////////////
// Get update by ID
router.put(
  "/projects/:id",
  authMiddleware.getProject,
  validate(updateProjectSchema),
  projectController.updateProjectById
);

////////////////////////////////////////////
// Delete a project by ID
router.delete(
  "/projects/:id",
  authMiddleware.getProject,
  projectController.deleteProjectById
);

module.exports = router;
