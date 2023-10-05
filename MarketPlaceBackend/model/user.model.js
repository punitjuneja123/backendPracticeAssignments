const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phoneNumber: String,
  address: String,
});

const userModel = mongoose.model("user", userSchema);

module.exports = { userModel };
