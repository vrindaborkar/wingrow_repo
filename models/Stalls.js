const mongoose = require("mongoose");

const Stalls = mongoose.model(
  "Stalls",
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

module.exports = Stalls;