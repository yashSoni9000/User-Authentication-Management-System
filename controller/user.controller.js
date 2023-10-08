const User = require("../models/User");
const bcrypt = require("bcrypt");
const Team = require("../models/Team");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");

//=========================//
//     Create User     //
//=========================//
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).send("Email already exists");

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    const savedUser = await user.save();
    res.status(200).send({ msg: "User Created!!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//=====================================//
//    Get a single User by ID      //
//=====================================//
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if User exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//=====================================//
//      Update a User by ID        //
//=====================================//
exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role, password } = req.body;

    // Check if User exists
    const currentUser = await User.findById(id).exec();
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    currentUser.username = username;
    currentUser.email = email;
    currentUser.password = hashedPassword;
    currentUser.role = role;
    const updatedUser = await currentUser.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//=====================================//
//      Delete a User by ID        //
//=====================================//
exports.deleteUserById = async (req, res) => {
  try {
    // Check if User exists
    await User.findByIdAndRemove(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
