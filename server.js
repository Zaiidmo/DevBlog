require("dotenv").config();
const express = require("express");
const { Sequelize } = require("sequelize");
const path = require("path");
const session = require("express-session");
const userrouter = require("./router/auth");
const forgotPasswordRouter = require('./router/resetPassword');
const articleRouter = require("./router/article");
const app = express();

// Session middleware should be applied before any custom middlewares
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
  })
);

// Middleware for checking authentication
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    res.locals.isAuthenticated = true;
    res.locals.user = req.session.user;
  } else {
    res.locals.isAuthenticated = false;
  }
  next();
}

// Apply middleware globally
app.use(isAuthenticated);

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Root route
app.use("/auth", userrouter);
app.use('/auth', forgotPasswordRouter);
app.use("/articles", articleRouter);
app.use("/comments", require("./routes/commentRoutes"));

app.get("/", (req, res) => {
  res.render("layout", { title: "Home", body: "home" });
});

// Database connection using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
  }
);

// Test database connection
sequelize
  .authenticate()
  .then(() => console.log("Database connection was successful."))
  .catch((error) => console.error("Unable to connect to the database:", error));

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
