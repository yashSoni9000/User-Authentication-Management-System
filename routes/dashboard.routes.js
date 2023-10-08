const express = require("express");
const router = express.Router();
const dashboardController = require("../controller/dashboard.controller");

//================================================//
//          Get all documents count               //
//================================================//
router.get("/dashboard", dashboardController.dashboard);

module.exports = router;
