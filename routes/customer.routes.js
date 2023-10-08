const express = require("express");
const router = express.Router();
const customerController = require("../controller/customer.controller");
const {
  schema,
  adminSchema,
  schemaPasswd,
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

//======================================//
//     Create a new user                //
//======================================//
router.post("/customer", validate(adminSchema), customerController.createUser);

//================================================//
//     Get a single user by ID                    //
//================================================//
router.get("/customer/:id", customerController.getUserById);

//======================================//
//     Update a user by ID              //
//======================================//
router.put(
  "/customer/:id",
  validate(adminSchema),
  customerController.updateUserById
);

//======================================//
//     Delete a user by ID              //
//======================================//
router.delete("/customer/:id", customerController.deleteUserById);

module.exports = router;
