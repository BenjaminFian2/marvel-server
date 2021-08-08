const mongoose = require("mongoose");

const Favorite = mongoose.model("Favorite", {
  characters: [
    {
      _id: { type: String },
      urlImg: { type: String },
      name: { type: String },
      description: { type: String },
    },
  ],
  comics: [
    {
      _id: { type: String },
      urlImg: { type: String },
      title: { type: String },
      description: { type: String },
    },
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = Favorite;
