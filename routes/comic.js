const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/comics", async (req, res) => {
  try {
    let { limit, skip, title } = req.query;

    if (!title) {
      title = "";
    }

    if (!limit || Number(limit) < 1) {
      limit = "100";
    }

    if (!skip || Number(skip) < 0) {
      skip = "0";
    }

    const comics = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY_MARVEL}&title=${title}&limit=${limit}&skip=${skip}`
    );
    res.status(200).json(comics.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/comics/:id", async (req, res) => {
  try {
    const comics = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.id}?apiKey=${process.env.API_KEY_MARVEL}`
    );
    res.status(200).json(comics.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
