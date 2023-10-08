const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
const Team = require("../models/Team");
const Task = require("../models/Task");
const User = require("../models/User");
const Project = require("../models/Project");

//=========================//
//     Verify Email        //
//=========================//
const verifyEmail = async (req, res, next) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user.isVerified) res.status(401).send("User not verified!");
    else next();
  } catch (error) {
    console.log(error);
    res.status(400).send("Not verified!");
  }
};

//=========================//
//     Login required      //
//=========================//
const loginrequired = (req, res, next) => {
  try {
    const token = req.cookies["access-token"];
    if (!token) res.status(400).send("Token not found");

    // Verify token
    const decodedToken = jwt.verify(token, "secretkey");
    if (!decodedToken) res.status(400).send("Token Expired");
    else {
      req.userData = { userId: decodedToken.userId };
      next();
    }
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
};

//=========================//
//     Valid Access        //
//=========================//
const validAccess = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ message: "Access denied" });
    }
  };
};

//=========================//
//     Get Project         //
//=========================//
const getProject = async function getProject(req, res, next) {
  try {
    // Find project by ID
    const project = await Project.findById(req.params.id);
    if (project == null) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.project = project;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//=========================//
//     Get Team            //
//=========================//
const getTeam = async function getTeam(req, res, next) {
  try {
    // Find team by ID
    const team = await Team.findById(req.params.id);
    if (team == null) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.team = team;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

//=========================//
//     Get User            //
//=========================//
const getUser = async function getUser(req, res, next) {
  try {
    //
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//=========================//
//     Get Task            //
//=========================//
const getTask = async function getTask(req, res, next) {
  try {
    //
    const task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.task = task;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//=========================//
//     Is Admin            //
//=========================//
const isAdmin = (req, res, next) => {
  if (req.body && req.body.role === "admin") {
    return next(); // User is an admin, allow access
  }
  return res
    .status(403)
    .json({ message: "Access denied. You are not an admin." });
};

const functions = {
  verifyEmail: verifyEmail,
  loginrequired: loginrequired,
  validAccess: validAccess,
  getProject: getProject,
  getTeam: getTeam,
  getUser: getUser,
  isAdmin: isAdmin,
  getTask: getTask,
};

module.exports = functions;
