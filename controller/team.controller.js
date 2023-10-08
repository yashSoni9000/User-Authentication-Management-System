const Team = require("../models/Team");

//==========================//
//    Create a new team     //
//==========================//
exports.createTeam = async (req, res) => {
  try {
    const newTeam = new Team({
      teamName: req.body.teamName,
      members: req.body.members,
    });
    const team = await newTeam.save();

    // Finding Team by ID and Populate the team with members
    const populatedTeam = await Team.findById(team._id)
      .populate("members", "username email")
      .exec();
    res.json(populatedTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//==========================//
//    Get a team by ID      //
//==========================//
exports.getTeamById = async (req, res) => {
  try {
    // Finding team by ID and Populate the team with members
    const team = await Team.findById(req.params.id).populate("members").exec();
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//=================================//
//      Update a team with ID      //
//=================================//
exports.updateTeamById = async (req, res) => {
  try {
    if (req.body.teamName) res.team.teamName = req.body.teamName;
    if (req.body.members) res.team.members.push(req.body.members)

    const updatedTeam = await res.team.save();
    res.json(updatedTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//=================================//
//      Delete a team with ID      //
//=================================//
exports.deleteTeamById = async (req, res) => {
  try {
    // Finding team by ID and delete
    await res.team.deleteOne();
    res.json({ message: "Team deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
