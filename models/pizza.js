const mongoose = require('mongoose');

const PizzaSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    amount: {
        type: Number
    },
    fillings: {
      type: mongoose.Schema.Types.Mixed
    },
    status: {
      type: String
    },
    img: {
      type: String
    }

});

const Pizza = module.exports = mongoose.model('pizza', PizzaSchema)
