const express = require('express');
const router = express.Router();
const Filling = require('../models/filling');

// Get all fill
router.get('/get', (req, res) => {

  Filling.find({})
    .then(result => {
      res.status(200).json({
        success: true,
        fillings: result
      })
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        error: err
      })
    })

})

module.exports = router;
