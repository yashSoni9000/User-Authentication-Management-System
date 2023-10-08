const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//=================================//
//          Team Schema            //
//=================================//
const teamSchema = new Schema({
  teamName: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  projectId: [{ type: Schema.Types.ObjectId, ref: "Project" }],
});

module.exports = mongoose.model("Team", teamSchema);
