const mongoose = require("mongoose");

const Trial = mongoose.model(
  "Trial",
  new mongoose.Schema({
      location:String,
      address:String,
      stallName: String,
      stallPrice: Number,
      isBooked: Boolean,
      bookedBy: String,
      bookedAt: String
  })
);

module.exports = Trial;
