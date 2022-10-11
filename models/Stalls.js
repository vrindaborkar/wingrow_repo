const mongoose = require("mongoose");

const Stalls = mongoose.model(
  "Stalls",
  new mongoose.Schema({
    location:String,
    stalls:Array,
    availablestalls:Array
  })
);

module.exports = Stalls;