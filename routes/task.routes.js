const express = require("express");
const router = express.Router();
const taskController = require("../controller/task.controller");
const authMiddleware = require("../middleware/auth");
const { taskSchema, updateTaskSchema } = require("../middleware/joi_verification");

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
// Create a new task
router.post("/tasks", validate(taskSchema), taskController.createTask);

////////////////////////////////////////////
// Get a specific task by ID
router.get("/tasks/:id",authMiddleware.getTask, taskController.getTaskById);

////////////////////////////////////////////
// Update a specific task by ID
router.put("/tasks/:id",authMiddleware.getTask, validate(updateTaskSchema), taskController.updateTaskById);

////////////////////////////////////////////
// Delete a specific task by ID
router.delete("/tasks/:id",authMiddleware.getTask, taskController.deleteTaskById);

module.exports = router;
