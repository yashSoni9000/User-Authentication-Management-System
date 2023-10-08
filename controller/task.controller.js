const Task = require("../models/Task");
const Project = require("../models/Project");
const User = require("../models/User");

//===============================//
//    Create a new task          //
//===============================//
exports.createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo } = req.body;
    const task = new Task({ title, description, projectId, assignedTo });
    const savedTask = await task.save();

    const populatedTask = await Task.findById(savedTask._id);
    res.status(201).send("Task Created!!");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//=====================================//
//      Get a specific task by ID      //
//=====================================//
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find task by ID
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//=====================================//
//      Update a task by ID            //
//=====================================//
exports.updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, projectId, assignedTo } = req.body;

    // Find task by ID
    const currentTask = await Task.findById(id).exec();
    if (!currentTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    if(title) currentTask.title = title;
    if(description) currentTask.description = description;
    if(projectId) currentTask.projectId = projectId;
    if(assignedTo){
      for (const element of assignedTo) {
        currentTask.assignedTo.push(element);
        const userPresent = await User.findById(element).exec();
        if (!userPresent) {
          return { error: "User not found" };
        }
        userPresent.tasks.push(id);
        await currentTask.save();
        await userPresent.save();
      }
    }
    const updatedTask = await currentTask.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//=====================================//
//      Delete a task by ID            //
//=====================================//
exports.deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find task by ID and delete
    const deletedTask = await Task.findByIdAndRemove(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).send("Task deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
