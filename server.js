const express = require('express');
const path = require("path");
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const allowCors = require('./config/cors');
const User = require('./models/user');
const config = require('./config/db');
const app = express();

// DB Config
const db = config.mongoURI;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowCors);

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log('MongoDB Connected')
  })
  .catch(err => console.log(err));

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Use Routes

app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/fillings'));
app.use('/pizza', require('./routes/pizza'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
