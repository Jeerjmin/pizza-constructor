const express = require('express');
const router = express.Router();
const Pizza = require('../models/pizza');



router.post('/status', (req, res) => {
  let newStatus = req.body[0]
  let id = req.body[1]
  Pizza.findOneAndUpdate({_id:id},{status:newStatus})
  .then(result => {
    res.status(200).json({
      success: "true",
      message: "Status updated",
      newStatus: result.status
    })
  })
  .catch(err => {
    res.status(400).json({
      success: "false",
      message: "Something wrong",
      errors: err
    })
  })
})


router.get('/get', (req,res) => {

  Pizza.find({})
  .then(result => {
    res.status(200).json({
      success: "true",
      message: "All pizzas are getted",
      pizzas: result
    })
  })
  .catch(err => {
    res.status(400).json({
      success: "false",
      message: "Something wrong",
      errors: err
    })
  })
})

// pizza to order
router.post('/order', (req, res) => {

  let Fillings = {...req.body[0]};
  delete Fillings.property
  delete Fillings.successMessage

  let newPizza = new Pizza({
    name: req.body[1],
    price: req.body[0].property.price,
    amount: req.body[0].property.amount,
    fillings: Fillings,
    status: 'В ожидание'
  })

  newPizza.save()
    .then((result) => {
      console.log("Successfully added!")
        res.status(200).json({
            success: true,
            message: `Successfully added!`,
            name: result.name
        });
    })
    .catch((error) =>{
      console.log("NOT added")
      res.status(400).json({
        success: false,
        error: error
      })
    })

})

module.exports = router;
