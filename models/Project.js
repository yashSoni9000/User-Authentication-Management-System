const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//=================================//
//          Project Schema         //
//=================================//
const projectSchema = new Schema({
  projectName: {
    type: String,
  },
  team: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

module.exports = mongoose.model("Project", projectSchema);
