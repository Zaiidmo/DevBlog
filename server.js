const express = require('express');
const app = express();
const commentRoutes = require('./routes/commentRoutes');

app.use(express.json()); // For parsing application/json

// Use comment routes
app.use('/comments', commentRoutes);
app.use('/hi', (req, res) => {
  res.send('welcome');
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
