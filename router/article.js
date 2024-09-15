const express = require("express");
const router = express.Router();

// Get all articles
router.get("/", (req, res) => {
  res.render("layout", { title: "Articles", body: "articles" });
});

// Create article - place this before the dynamic route
router.get("/create-article", (req, res) => {
  res.render("layout", { title: "Create Article", body: "create-article" });
});

// Get article by id - this should be after all specific routes
router.get("/:id", (req, res) => {
  res.render("layout", { title: "Article", body: "article" });
});

module.exports = router;
