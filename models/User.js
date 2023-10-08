const { boolean } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//=================================//
//          User Schema            //
//=================================//
const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
  emailToken: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    enum: {
      admin: "admin",
      employee: "employee",
      customer: "customer",
      superAdmin: "superAdmin",
    },
  },
  invoices: [{ type: Schema.Types.ObjectId, ref: "Invoice", default: null }],
  teamId: [{ type: Schema.Types.ObjectId, ref: "Team", default: null }],
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task", default: null }],
});

module.exports = mongoose.model("User", userSchema);
