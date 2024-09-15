const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Article, User } = require('../models'); // Import the User model along with Article
const isAuthenticated = require('../middleware/isAuthenticated'); // Require the middleware

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: './public/articles/', // Directory to save files
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Get all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: User // Include User model to get the author's information
    });
    res.render("layout", { title: "Articles", body: "articles", articles });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// GET - create article form
router.get("/create-article", isAuthenticated, (req, res) => {
  res.render("layout", { title: "Create Article", body: "create-article" });
});

// POST - create new article
router.post('/creating', isAuthenticated, upload.single('poster'), async (req, res) => {
  const { title, description, content } = req.body;
  console.log(req.file.filename); // Log the file object to debug

  // Get the userId from the session
  const userId = req.session.user.id;

  // Check if the file was uploaded successfully
  const poster = req.file ? `/articles/${req.file.filename}` : null;

  try {
    // Save the article in the database with the userId
    const article = await Article.create({
      title,
      description,
      poster,
      content,
      userId 
    });

    // Redirect to the articles page after successful creation
    res.redirect('/articles');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// GET - single article by id
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id, {
      include: User // Include User model to get the author's information
    });
    if (article) {
      res.render("layout", { title: "Article", body: "article", article });
    } else {
      res.status(404).send('Article not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
