const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Article } = require('../models'); // Import your Article model
const isAuthenticated = require('../middleware/isAuthenticated'); // Require the middleware

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/articles/'), // Directory to save files
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
    // Fetch all articles from the database
    const articles = await Article.findAll();

    // Render the view with the articles
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
  console.log(req.file); // Log the file object to debug

  // Get the userId from the session
  const userId = req.session.user.id;

  // Check if the file was uploaded successfully
  const poster = req.file ? `/articles/${req.file.filename}` : null;

  try {
    // Save the article in the database with the userId
    const article = await Article.create({
      title,
      description,
      poster, // This should be the path stored in the database
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

// Get article by id
router.get("/:id", (req, res) => {
  res.render("layout", { title: "Article", body: "article" });
});

module.exports = router;