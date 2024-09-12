require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');
const path = require('path');
const session = require('express-session');
const userrouter = require('./router/auth');
const forgotPasswordRouter = require('./router/resetPassword');

const app = express();

//The view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static files
app.use(express.static(path.join(__dirname, 'public')));


// Session middleware
app.use(session({
  secret: 'your_session_secret', // A secret key used to sign the session ID cookie
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));


// Root route
app.get('/', (req, res) => {
  res.render('layout', { title: 'Home', body: 'home' });
  res.render('layout', { title: 'DevBlog', body: 'home' });
});
// Routes 
app.use('/auth', userrouter);
app.use('/auth', forgotPasswordRouter);
app.use('/comments', require('./routes/commentRoutes'));


// Articles Routes 
app.get('/articles', (req, res) => {
  res.render('layout', { title: 'Articles', body: 'articles' });
});


// Database connection using environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  port: process.env.DB_PORT || 3306,
});
// Test database connection
sequelize
  .authenticate()
  .then(() => console.log('Database connection was successful.'))
  .catch((error) => console.error('Unable to connect to the database:', error));


// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
