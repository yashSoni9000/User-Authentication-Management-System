const mongoose = require("mongoose");
const Project = require("../models/Project");
const Task = require("../models/Task");
const Team = require("../models/Team");
const User = require("../models/User");

//=========================================//
//   Get document counts for dashboard     //
//=========================================//
exports.dashboard = async (req, res) => {
  try {
    // Get counts of each document type
    const counts = {
      projects: await Project.countDocuments(),
      tasks: await Task.countDocuments(),
      teams: await Team.countDocuments(),
      users: await User.countDocuments(),
    };

    // Get names of each document type
    const names = {
      projects: await Project.find({}, "name"),
      tasks: await Task.find({}, "title"),
      teams: await Team.find({}, "teamName"),
      users: await User.find({}, "username"),
    };

    res.status(200).json({ counts, names });
  } catch (error) {
    console.error("Error retrieving document counts:", error);
    res
      .status(500)
      .json({ message: "Server error while retrieving document counts" });
  }
};
