const express = require('express');
const { Sequelize } = require('sequelize');
const path = require('path');
const session = require('express-session');
const userrouter = require('./router/auth');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
  secret: 'your_session_secret', // Replace with a strong, unique secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using https
}));

app.use('/auth', userrouter);

app.get('/', (req, res) => {
  res.render('layout', { title: 'Home', body: 'home', user: req.session.user });
});

const sequelize = new Sequelize('devblog', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection was successful');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database synchronized');
    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  })
  .catch((error) => console.log('There was an error: ' + error));