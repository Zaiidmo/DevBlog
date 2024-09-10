const express = require('express');
const { Sequelize } = require('sequelize');
const path = require('path');
const userrouter = require('./router/auth'); // Correct path to your user router


const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth', userrouter);


app.get('/', (req, res) => {
  res.render('layout',{ title: 'Home', body: 'home' } ); 
});
// app.use('/auth', userrouter);


const sequelize = new Sequelize('devblog', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

sequelize
  .authenticate()
  .then(() => console.log('Connection was successful'))
  .catch((error) => console.log('There was an error: ' + error));

app.listen(3001, () => {
  console.log('Database has been connected! Check port 3001');
});
