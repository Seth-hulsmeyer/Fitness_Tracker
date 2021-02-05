const router = require("express").Router();
const path = require("path");

//main page route
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

//exercise page route
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

//stats or dashboard page route
router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;
