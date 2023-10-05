const mongoose = require("mongoose");

const listingSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  description: String,
  price: Number,
  category: String,
});

const listingModel = mongoose.model("listing", listingSchema);

module.exports = { listingModel };
