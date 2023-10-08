const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//=================================//
//          Task Schema            //
//=================================//
const taskSchema = new Schema({
  title: { type: String },
  description: { type: String },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    default: null,
  },
  assignedTo: [{ type: Schema.Types.ObjectId, ref: "User", default: null }],
});

module.exports = mongoose.model("Task", taskSchema);
