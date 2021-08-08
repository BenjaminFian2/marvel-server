const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();

const User = require("../models/User");
const Favorite = require("../models/Favorite");

router.get("/favorites", isAuthenticated, async (req, res) => {
  try {
    const favorites = await Favorite.findOne({ owner: { _id: req.user._id } });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/favorite/character/:id", isAuthenticated, async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ owner: { _id: req.user._id } });
    if (!favorite) {
      const newFavorite = new Favorite({
        characters: [
          {
            _id: req.params.id,
            urlImg: req.fields.urlImg,
            name: req.fields.name,
            description: req.fields.description,
          },
        ],
        comics: [],
        owner: req.user,
      });
      await newFavorite.save();
      res.status(200).json(newFavorite);
    } else {
      const newCharacters = [...favorite.characters];
      const obj = {
        _id: req.params.id,
        urlImg: req.fields.urlImg,
        name: req.fields.name,
        description: req.fields.description,
      };
      newCharacters.push(obj);
      favorite.characters = newCharacters;
      await favorite.save();
      res.status(200).json(favorite);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/favorite/comic/:id", isAuthenticated, async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ owner: { _id: req.user._id } });
    if (!favorite) {
      const newFavorite = new Favorite({
        characters: [],
        comics: [
          {
            _id: req.params.id,
            urlImg: req.fields.urlImg,
            title: req.fields.title,
            description: req.fields.description,
          },
        ],
        owner: req.user,
      });
      await newFavorite.save();
      res.status(200).json(newFavorite);
    } else {
      const newComics = [...favorite.comics];
      const obj = {
        _id: req.params.id,
        urlImg: req.fields.urlImg,
        title: req.fields.title,
        description: req.fields.description,
      };
      newComics.push(obj);
      favorite.comics = newComics;
      await favorite.save();
      res.status(200).json(favorite);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete(
  "/favorite/characterDelete/:id",
  isAuthenticated,
  async (req, res) => {
    try {
      const favorite = await Favorite.findOne({ owner: { _id: req.user._id } });
      const newCharacters = [...favorite.characters];
      for (let i = 0; i < newCharacters.length; i++) {
        if (newCharacters[i]._id === req.params.id) {
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

router.delete(
  "/favorite/comicDelete/:id",
  isAuthenticated,
  async (req, res) => {
    try {
      const favorite = await Favorite.findOne({ owner: { _id: req.user._id } });
      const newComics = [...favorite.comics];
      for (let i = 0; i < newComics.length; i++) {
        if (newComics[i]._id === req.params.id) {
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
  }
);

module.exports = router;
