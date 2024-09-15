require("dotenv").config();
const express = require("express");
const { Sequelize } = require("sequelize");
const path = require("path");
const session = require("express-session");
const userrouter = require("./router/auth");
const forgotPasswordRouter = require('./router/resetPassword');
const articleRouter = require("./router/article");
const profileRouter = require('./router/profile');
const app = express();
const bodyParser = require("body-parser");

// Set up view engine

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Session middleware
app.use(
  session({
    secret: "your_session_secret", // Replace with a strong, unique secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using https
  })
);

// Root route
app.use("/auth", userrouter);
app.use('/auth', forgotPasswordRouter);
app.use("/articles", articleRouter);
app.use("/profile", profileRouter);
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
