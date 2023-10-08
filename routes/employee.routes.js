// routes/user.js
const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employee.controller");
const authUser = require("../middleware/auth");
const {
  employeeSchema,
  updateEmployeeSchema,
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

//===============================//
//      Create a new employee    //
//===============================//
router.post("/employee", validate(employeeSchema), employeeController.createEmployee);

//=======================================//
//      Get employees by id              //
//=======================================//
router.get("/employee/:id",authUser.getUser, employeeController.getEmployeeById);

//==========================================//
//      Update employees by id              //
//==========================================//
router.put(
  "/employee/:id",
  validate(updateEmployeeSchema),
  employeeController.updateEmployeeById
);

//==========================================//
//      Delete employees by id              //
//==========================================//
router.delete("/employee/:id",authUser.getUser, employeeController.deleteEmployeeById);

module.exports = router;
