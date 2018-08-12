const mongoose = require('mongoose');

//Types of filling
//0 - Meat, 1 - Fish, 2 - Cheese, 3 - Vegetable, 4 - Other.
//5 - Dough for pizza base
//6 - Sauce
const FillingSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    price: {
        type: Number
    },
    amount: {
        type: Number
    },
    weight: {
        type: Number
    },
    size: {
      type: String
    },
    type: {
      type: String
    },
    img: {
      type: String
    }

});


const Filling = module.exports = mongoose.model('filling', FillingSchema)
