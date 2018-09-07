const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    scope: {
      type: Number
    },
    sessions: {
        type: mongoose.Schema.Types.Mixed
    }
});

const User = module.exports = mongoose.model('user', UserSchema)
