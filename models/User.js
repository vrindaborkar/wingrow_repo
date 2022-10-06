const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstname:String,
    lastname:String,
    role:String,
    phone:String,
    password: String,
  })
);

module.exports = User;