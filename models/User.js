const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  token: { type: String },
  hash: { type: String },
  salt: { type: String },
});

module.exports = User;
