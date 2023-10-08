const Project = require("../models/Project");
const Task = require("../models/Task");
const Team = require("../models/Team");

//===============================//
//    Create a new project       //
//===============================//
exports.createProject = async (req, res) => {
  try {
    const { projectName, team, tasks } = req.body;
    const newProject = new Project({
      projectName,
      team,
      tasks,
    });
    const project = await newProject.save();
    // if (team) {
    //   for (const element of team) {
    //     const teamPresent = await Team.findById(element).exec();
    //     if (!teamPresent) {
    //       return { error: "Team not found" };
    //     }
    //     teamPresent.projectId.push(project._id);
    //     await teamPresent.save();
    //   }
    // }
    // if (tasks) {
    //   for (const element of tasks) {
    //     const taskPresent = await Task.findById(element).exec();
    //     if (!taskPresent) {
    //       return { error: "Task not found" };
    //     }
    //     taskPresent.projectId.push(project._id);
    //     await taskPresent.save();
    //   }
    // }

    // Populate the project with tasks
    const populatedProject = await Project.findById(project._id)
      .populate("team", "tasks")
      .exec();
    res.status(201).json(populatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//==================================================//
//    Get a single project and populate with tasks  //
//==================================================//
exports.getProjectById = async (req, res) => {
  try {
    // Finding project by ID and Populate the project with tasks
    const project = await Project.findById(req.params.id)
      .populate("tasks")
      .exec();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//==================================//
//    Update a project with ID      //
//==================================//
exports.updateProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectName, team, tasks } = req.body;
    // console.log(req.body);
    const currentProject = await Project.findById(id).exec();
    if (!currentProject) {
      return { error: "Project not found" };
    }
    if (projectName) currentProject.projectName = projectName;
    if (team) {
      for (const element of team) {
        currentProject.team.push(element);
        const teamPresent = await Team.findById(element).exec();
        if (!teamPresent) {
          return { error: "Team not found" };
        }
        teamPresent.projectId.push(id);
        await currentProject.save();
        await teamPresent.save();
      }
    }
    if (tasks) {
      for (const element of tasks) {
        currentProject.tasks.push(element);
        const taskPresent = await Task.findById(element).exec();
        if (!taskPresent) {
          return { error: "Task not found" };
        }
        taskPresent.projectId.push(id);
        await currentProject.save();
        await taskPresent.save();
      }
    }
    const updatedProject = await currentProject.save();
    res.status(201).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//==================================//
//    Delete a project with ID      //
//==================================//
exports.deleteProjectById = async (req, res) => {
  try {
    await res.project.deleteOne();
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
