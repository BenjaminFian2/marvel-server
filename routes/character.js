const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters", async (req, res) => {
  try {
    let { limit, skip, name } = req.query;

    if (!name) {
      name = "";
    }

    if (!limit || Number(limit) < 1) {
      limit = "100";
    }

    if (!skip || Number(skip) < 0) {
      skip = "0";
    }

    const characters = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY_MARVEL}&name=${name}&limit=${limit}&skip=${skip}`
    );
    res.status(200).json(characters.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
