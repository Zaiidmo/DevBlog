const express = require("express");
const router = express.Router();

// Get all articles
router.get("/", (req, res) => {
  res.render("layout", { title: "Articles", body: "articles" });
});


module.exports = router;
