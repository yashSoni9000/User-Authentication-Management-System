const mongoose = require("mongoose");
require("dotenv").config();

//================================================//
//          Connect to MongoDB Database           //
//================================================//
const connectionString = process.env.MONGODB_URI;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.on("disconnected", () => {
  console.log("MongoDB connection disconnected");
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});
