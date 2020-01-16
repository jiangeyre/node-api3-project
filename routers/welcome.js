const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello! Welcome to the GRID 🌱 (CUE FANCY ELECTRONIC TRON MUSIC)");
});

module.exports = router;