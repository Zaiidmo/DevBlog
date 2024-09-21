const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Article, User, Like,Comment } = require('../models'); // Import the User model along with Article
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
// Get all articles with pagination
router.get("/", async (req, res) => {
  try {
    // Get the page number from the query, default to 1 if not provided
    const page = parseInt(req.query.page) || 1;
    // Define the limit (articles per page), e.g., 6 articles per page
    const limit = 9;
    const offset = (page - 1) * limit; // Calculate the offset

    // Fetch the total number of articles
    const totalArticles = await Article.count();

    // Fetch articles with pagination and include the User model
    const articles = await Article.findAll({
      include: User,
      limit: limit,
      offset: offset
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalArticles / limit);

    // Render the view with articles and pagination data
    res.render("layout", {
      title: "Articles",
      body: "articles",
      articles,
      currentPage: page,
      totalPages: totalPages
    });
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
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    // Fetch the article by ID and include the author (User)
    const article = await Article.findByPk(req.params.id, {
      include: User // Include User model to get the author's information
    });

    // Check if the current user has liked the article
    const userId = req.session.user.id;
    const userLike = await Like.findOne({
      where: { userId, articleId: article.id }
    });

    const isLiked = userLike ? true : false;

    // Fetch the comments related to the article
    const comments = await Comment.findAll({
      where: { articleId: article.id },
      include: [{ model: User, attributes: ['username','avatar'] }],
      order: [['createdAt', 'DESC']]
    });

    // Format the comments to be passed to the view
    const formattedComments = comments.map(comment => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      avatar:comment.User.avatar,
      username: comment.User ? comment.User.username : 'Anonymous'
    }));
    console.log(comments);

    // Render the article view and pass the article, comments, and like status
    res.render("layout", {
      title: "Article",
      body: "article",
      article: article, // Pass the article data
      user: req.session.user, // Pass the session user explicitly
      isLiked, // Pass like status
      comments: formattedComments // Pass the formatted comments
    });
  } catch (err) {
    console.error('Error displaying article:', err);
    res.status(500).send(err.message);
  }
});


// DELETE - delete article by id
router.delete("/:id", isAuthenticated, async (req, res) => {
  const userId = req.session.user.id;

  try {
    
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(404).send("Article not found");
    }

    // Check if the user is the author of the article
    if (article.userId !== userId) {
      return res.status(403).send("You are not authorized to delete this article");
    }

    await article.destroy();
    console.log("Article deleted successfully");
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (err) {
    console.error("Error deleting article:", err);
    res.status(500).json({ message: err.message });
  }
});

// PUT - update article by id
router.put("/:id", isAuthenticated, upload.single('poster'), async (req, res) => {
  const userId = req.session.user.id;
  const { title, description, content } = req.body;

  try {
    // Find the article by ID
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Ensure that the current user is the owner of the article
    if (article.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized to update this article" });
    }

    // Update only if a new value is provided, otherwise keep the original
    article.title = title || article.title;
    article.description = description || article.description;
    article.content = content || article.content;

    // Check if a new poster was uploaded, otherwise keep the original
    if (req.file) {
      const poster = `/articles/${req.file.filename}`;
      article.poster = poster;
    }

    // Save the updated article
    await article.save();

    // Return a success response with the updated article
    res.status(200).json({ message: "Article updated successfully", article });
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST - Toggle like
router.post('/:id/toggle-like', isAuthenticated, async (req, res) => {
  const userId = req.session.user.id;
  const articleId = req.params.id;

  try {
    // Check if the user already liked the article
    const like = await Like.findOne({ where: { userId, articleId } });

    if (like) {
      // Unlike if already liked
      await like.destroy();
      res.json({ message: 'Article unliked' });
    } else {
      // Create a new like
      await Like.create({ userId, articleId });
      res.json({ message: 'Article liked' });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ message: 'Error toggling like' });
  }
});

module.exports = router;
