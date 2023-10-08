const User = require("../models/User");
const Team = require("../models/Team");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const crypto = require("crypto");
const cookie = require("cookie-parser");

//================================//
//       Register a user          //
//================================//
exports.createEmployee = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    const savedUser = await user.save();

    res.status(200).send({ msg: "Employee Created!!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//================================//
//       Get User By ID           //
//================================//
exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//================================//
//       Update User By ID        //
//================================//
exports.updateEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, teamId, password, role } = req.body;
    const currentUser = await User.findById(id).exec();
    if (!currentUser) {
      return res.status(404).json({ message: "Employee not found" });
    }
    // If one want to remove from one team and add to other team
    // if (currentUser.teamId !== teamId) {
    //   const oldTeamID = currentUser.teamId._id.toString();
    //   const team = await Team.findById(oldTeamID).exec();
    //   if (!team) {
    //     return { error: "Project not found" };
    //   }
    //   const arr = team.members;
    //   for (const element of arr) {
    //     if (element.toString() === id.toString()) {
    //       const index = arr.indexOf(element);
    //       if (index > -1) {
    //         arr.splice(index, 1);
    //       }
    //       team.members = arr;
    //       break;
    //     }
    //   }
    //   await team.save();
    // }
    if (teamId) {
      const newTeam = await Team.findById(teamId).exec();
      if (!newTeam) {
        return { error: "Project not found" };
      }
      newTeam.members.push(id);
      currentUser.teamId.push(teamId);
      await newTeam.save();
    }
    if(password){
      // Hashing the password
      const hashedPassword = await bcrypt.hash(password, 10);
      currentUser.password = hashedPassword;
    }
    if(username) currentUser.username = username;
    if(email) currentUser.email = email;
    if(role) currentUser.role = role;
    const updatedUser = await currentUser.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//================================//
//       Delete User By ID        //
//================================//
exports.deleteEmployeeById = async (req, res) => {
  try {
    req.params.id;

    // Find user by ID and delete
    await res.user.deleteOne();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
