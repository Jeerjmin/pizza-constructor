const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const bodyParser = require('body-parser');
const allowCors = require('./config/cors');
const User = require('./models/user');
const Filling = require('./models/filling');

const mongoURI = 'mongodb://localhost/pizza'
const DBInitialData = require('./config/db_initial_data')

const app = express();

// DB Config
const db = mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log('MongoDB Connected')
  })
  .catch(err => console.log(err));




// Admin account: username - 'Admin', password - 'Admin'
// Filling to Pizza Constructor
User.collection.insert(DBInitialData.AdminProfile, onInsert);
Filling.collection.insert(DBInitialData.Fillings, onInsert);
function onInsert(err, docs) {
    if (err) {
        console.log('error', err)
    } else {
        console.info('Datas were successfully stored.',docs);
    }
}



// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowCors);

// Use Routes
//
//
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/fillings'));
app.use('/pizza', require('./routes/pizza'));


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
