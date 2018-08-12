const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken')



// Post pizza
router.post('/login', (req, res) => {
  console.log('req.body.username',req.body.username)
  let errors = '';
  User.findOne({ username:req.body.username })
    .then((user) => {
        if (user.password === req.body.password) {
          const payload = {
                sub: user._id
          };
          const userData = {
                username: user.username,
          };
          const token = jwt.sign(payload,"daft punk are best");
                return res.status(200).json({
                        success: true,
                        message: 'You have successfully logged in!',
                        userData,
                        token
                });
        }
        else {
          errors="Couldn't find username/password."
          return res.status(400).json({
                success: false,
                errors: errors
          });
        }
    })
    .catch(err => {
      errors="Couldn't find username/password."
      return res.status(400).json({
            success: false,
            errors: errors
      });
    })
})

module.exports = router;
