const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose');

import { PasswordPolicy, charsets } from 'password-sheriff';
import validator from "email-validator";
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';


router.get('/users', (req, res) => {
  User.find({},{username: 1, email: 1, scope: 1, sessions: 1})
  .then(result => {
    console.log('result users', result)
    res.send({success: true, users: result})
  })
})

router.get('/load', (req, res) => {

    console.log('req',req)
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }

    let user = null;
    jwt.verify(token, 'secretkey', function(err, decoded) {
      user = decoded;
    });
    if (user) {
    const {username, session_id} = user
    console.log('/load',session_id)
    let result = null;

    const own_name = 'sessions.' + session_id
    const query = {}
    query[own_name] = { $exists: true }

      User.findOne(query)
      .then(result => {
        console.log('profule',[(result.email && result), result.email, result])
        if ( result && result.email) {
          res.send({success: true, result });
        }
        else {
          res.send({ success: false })
        }
      })
    }
    else {
      res.send({success: false})
    }
});

router.post('/register', (req, res) => {
  const {username, email, password} = req.body
  console.log('req.body.username',[req.body,username,email,password])

  const passwordPolicy = new PasswordPolicy({
    length: { minLength: 8 },
    contains: {
        expressions: [charsets.upperCase, charsets.numbers]
    },
  });

  let authenticationResult = {
      success: false,
      message: 'Check the form for errors.',
      errors: null
    };

  if (!validator.validate(email)) {
          authenticationResult.errors = "Wrong e-mail format"
          res.json(authenticationResult);
      } else {
          if (!passwordPolicy.check(password)) {
            authenticationResult.errors = "The password must contain at least 8 characters. Upper case and numbers"
            res.json(authenticationResult);
          } else {
            bcrypt.hash(password, null, null, (err, hash) => {
                        User.create({
                            username,
                            email,
                            password: hash,
                            scope: 1,
                            sessions: {}
                        }).then(user => {
                            console.log('user',user)
                            res.json({
                                success: true,
                                message: 'You successfully created an account! Please login.'
                            })
                        })
                        .catch(error => {
                             if (error.name === 'MongoError' && error.code === 11000 && error.message.indexOf('email_1') > 0) {
                                   authenticationResult.errors = 'This e-mail address is already taken.';
                             }
                             if (error.name === 'MongoError' && error.code === 11000 && error.message.indexOf('username_1') > 0) {
                                   authenticationResult.errors = 'This username is already taken.';
                               }
                             res.json(authenticationResult)
                         })
                       })
          }
        }
})



router.post('/login', (req, res) => {
  console.log('req.body.username',req.body.username)
  let errors = '';
  User.findOne({ username:req.body.username })
    .then((user) => {
      bcrypt.compare(req.body.password, user.password, (err,result) =>{
        if (result) {
          const objectId = mongoose.Types.ObjectId();
          let date_now = new Date();

          let update = {
              $set: {}
          };
          update['$set']['sessions.' + objectId] = {
                expires: date_now.setMonth(date_now.getMonth() + 3),
                user_agent: req.headers['user-agent']
          };
          const filter = {
                username: req.body.username
          };

          User.updateOne(filter, update, (err, result) => {
              if (err) {
                  res.json(err);
              } else {
                  const payload = {username: filter.username, session_id: objectId};
                  const token = jwt.sign(payload, 'secretkey');
                  res.cookie('jwt', token);
                  res.json({
                        success: true,
                        user
                });
              }
          });
        }
        else {
          errors="Couldn't find username/password."
              res.json({
                success: false,
                errors: errors
          });
        }
    })
  })
    .catch(err => {
      errors="Couldn't find username/password."
          res.json({
            success: false,
            errors: errors
      });
    })
})

router.get('/logout', (req,res) => {
    let token = null;
    let user = null;
    let update = {
        $unset: {}
    };

    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }

    jwt.verify(token, 'secretkey', function(err, decoded) {
      user = decoded;
    });
    console.log('logout',user)
    if (user) {
      const {username, session_id} = user
      let result = null
      User.findOne({username})
      .then(profile => {
        update['$unset']['sessions.' + session_id] = null;
        User.updateOne({username}, update, (err, result) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send({success: true});
            }
        });
      })
    }

})

module.exports = router;
