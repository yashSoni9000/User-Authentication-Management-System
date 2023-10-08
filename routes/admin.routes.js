// adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller');
const adminMiddleware = require('../middleware/auth');
const { schema,adminSchema, schemaPasswd } = require("../middleware/joi_verification");

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

//================================================//
//     Create a new resource for the admin        //
//================================================//
router.post('/admin/employee', adminMiddleware.isAdmin,validate(adminSchema) ,adminController.createUser);

//============================================//
//      Get resources for the admin           //
//============================================//
router.get('/admin/employee/:id', adminMiddleware.isAdmin , adminController.getUserById);

//================================================//
//      Update a resource for the admin           //
//================================================//
router.put('/admin/employee/:id', adminMiddleware.isAdmin,validate(adminSchema) , adminController.updateUserById);

//================================================//
//      Delete a resource for the admin           //
//================================================//
router.delete('/admin/employee/:id', adminMiddleware.isAdmin, adminController.deleteUserById);

module.exports = router;
