const mongoose = require("mongoose");

const Favorite = mongoose.model("Favorite", {
  characters: [{ type: String }],
  comics: [{ type: String }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = Favorite;
