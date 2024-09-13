const express = require("express");
const router = express.Router();

// Get all articles
router.get("/", (req, res) => {
  res.render("layout", { title: "Articles", body: "articles" });
});

// Get article by id
router.get("/:id", (req, res) => {
  res.render("layout", { title: "Article", body: "article" });
});


module.exports = router;
