// routes/user.js
const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authUser = require("../middleware/auth");
const {
    userSchema,
    updateUserSchema,
  } = require("../middleware/joi_verification");

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
// Create a new user
router.post("/users",validate(userSchema), userController.createUser);

////////////////////////////////////////////
// Get a single user by ID
router.get("/users/:id", authUser.getUser, userController.getUserById);

////////////////////////////////////////////
// Update a user by ID
router.put("/users/:id", authUser.getUser,validate(updateUserSchema), userController.updateUserById);

////////////////////////////////////////////
// Delete a user by ID
router.delete("/users/:id", authUser.getUser, userController.deleteUserById);

module.exports = router;
