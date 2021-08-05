const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();

const User = require("../models/User");
const Favorite = require("../models/Favorite");

const mongoose = require("mongoose");

router.get("/favorite/character/:id", isAuthenticated, async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ owner: { _id: req.user._id } });
    if (!favorite) {
      const newFavorite = new Favorite({
        characters: [req.params.id],
        comics: [],
        owner: req.user,
      });
      await newFavorite.save();
      res.status(200).json(newFavorite);
    } else {
      const newCharacters = [...favorite.characters];
      newCharacters.push(req.params.id);
      favorite.characters = newCharacters;
      await favorite.save();
      res.status(200).json(favorite);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/favorite/comic/:id", isAuthenticated, async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ owner: { _id: req.user._id } });
    if (!favorite) {
      const newFavorite = new Favorite({
        characters: [],
        comics: [req.params.id],
        owner: req.user,
      });
      await newFavorite.save();
      res.status(200).json(newFavorite);
    } else {
      const newComics = [...favorite.comics];
      newComics.push(req.params.id);
      favorite.comics = newComics;
      await favorite.save();
      res.status(200).json(favorite);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get(
  "/favorite/characterDelete/:id",
  isAuthenticated,
  async (req, res) => {
    try {
      const favorite = await Favorite.findOne({ owner: { _id: req.user._id } });
      const newCharacters = [...favorite.characters];
      for (let i = 0; i < newCharacters.length; i++) {
        if (newCharacters[i] === req.params.id) {
          newCharacters.splice(i, 1);
          break;
        }
      }
      favorite.characters = newCharacters;
      await favorite.save();
      res.status(200).json(favorite);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get("/favorite/comicDelete/:id", isAuthenticated, async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ owner: { _id: req.user._id } });
    const newComics = [...favorite.comics];
    for (let i = 0; i < newComics.length; i++) {
      if (newComics[i] === req.params.id) {
        newComics.splice(i, 1);
        break;
      }
    }
    favorite.comics = newComics;
    await favorite.save();
    res.status(200).json(favorite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
