const express = require("express");
const router = express.Router();
const teamController = require("../controller/team.controller");
const authMiddleware = require("../middleware/auth");
const { teamSchema,updateTeamSchema } = require("../middleware/joi_verification");

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
// Create a new team
router.post("/teams", validate(teamSchema), teamController.createTeam);

////////////////////////////////////////////
//Get specific team
router.get("/teams/:id",authMiddleware.getTeam, teamController.getTeamById);

////////////////////////////////////////////
// Get a single team by ID
router.put(
  "/teams/:id",
  authMiddleware.getTeam,
  validate(updateTeamSchema),
  teamController.updateTeamById
);

////////////////////////////////////////////
// Delete a team by ID
router.delete(
  "/teams/:id",
  authMiddleware.getTeam,
  teamController.deleteTeamById
);

module.exports = router;
