const AdminProfile = [{
  username: 'Admin',
  password: 'Admin'
}];

//Types of filling
//0 - Meat, 1 - Fish, 2 - Cheese, 3 - Vegetable, 4 - Other.
//5 - Dough for pizza base
//6 - Sauce

const Fillings = [
  {
    name: 'Little',
    nameRus: 'Маленькая пицца',
    price: 100,
    size: '20см',
    type: 'Dough',
    typeRus: 'Основа для пиццы',
    url: 'https://res.cloudinary.com/jeerjmin/image/upload/v1534038378/pizza-test/little.png'
  },
  {
    name: 'Middle',
    nameRus: 'Средняя пицца',
    price: 150,
    size: '30см',
    type: 'Dough',
    typeRus: 'Основа для пиццы',
    url: 'https://res.cloudinary.com/jeerjmin/image/upload/v1534038378/pizza-test/medium.png'
  },
  {
    name: 'Big',
    nameRus: 'Большая пицца',
    price: 200,
    size: '40см',
    type: 'Dough',
    typeRus: 'Основа для пиццы',
    url: 'https://res.cloudinary.com/jeerjmin/image/upload/v1534038378/pizza-test/big.png'
  },
  {
    name: 'Сreamy sauce',
    nameRus: 'Сливочный соус',
    type: 'Sauce',
    typeRus: 'Соусы'
  },
  {
    name: 'Tomato sauce',
    nameRus: 'Томатный соус',
    type: 'Sauce',
    typeRus: 'Соусы'
  },
{
  name: 'Bacon',
  nameRus: 'Бекон',
  price: 50,
  type: 'Meat',
  typeRus: 'Мясо',
  url: 'https://res.cloudinary.com/jeerjmin/image/upload/v1534038378/pizza-test/bacon.png'
},
{
  name: 'Chicken',
  nameRus: 'Курица',
  price: 40,
  type: 'Meat',
  typeRus: 'Мясо',
  url: 'https://res.cloudinary.com/jeerjmin/image/upload/v1534038378/pizza-test/chicken.png'
},
{
  name: 'Salami',
  nameRus: 'Салями',
  price: 30,
  type: 'Meat',
  typeRus: 'Мясо',
  url: 'https://res.cloudinary.com/jeerjmin/image/upload/v1534038378/pizza-test/salami.png'

},
{
  name: 'Ham',
  nameRus: 'Ветчина',
  price: 60,
  type: 'Meat',
  typeRus: 'Мясо',
  url: 'https://res.cloudinary.com/jeerjmin/image/upload/v1534038378/pizza-test/ham.png'
},
{
  name: 'Parmesan',
  nameRus: 'Пармезан',
  price: 30,
  type: 'Cheese',
  typeRus: 'Сыры',
  url: 'https://res.cloudinary.com/jeerjmin/image/upload/v1534038532/pizza-test/parmesan.png'
},
{
  name: 'Mozzarella',
  nameRus: 'Моцарелла',
  price: 25,
  type: 'Cheese',
  typeRus: 'Сыры',
  url: 'https://res.cloudinary.com/jeerjmin/image/upload/v1534038532/pizza-test/mozarella.png'
},
{
  name: 'Champignon',
  nameRus: 'Шампиньоны',
  price: 20,
  type: 'Vegetable',
  typeRus: 'Овощи',
  url: 'https://res.cloudinary.com/jeerjmin/image/upload/v1534038532/pizza-test/champ.png'
},
{
  name: 'Gherkins',
  nameRus: 'Корнишоны',
  price: 15,
  type: 'Vegetable',
  typeRus: 'Овощи',
  url: 'https://res.cloudinary.com/jeerjmin/image/upload/v1534038539/pizza-test/kornishon.png'
},
{
  name: 'Ananas',
  nameRus: 'Ананас',
  price: 20,
  type: 'Vegetable',
  typeRus: 'Овощи',
  url: 'https://res.cloudinary.com/jeerjmin/image/upload/v1534038538/pizza-test/ananas.png'
},
{
  name: 'Olive',
  nameRus: 'Оливки',
  price: 25,
  type: 'Vegetable',
  typeRus: 'Овощи',
  url: 'https://res.cloudinary.com/jeerjmin/image/upload/v1534038532/pizza-test/olive.png'
},
{
  name: 'Tomato',
  nameRus: 'Томаты',
  price: 15,
  type: 'Vegetable',
  typeRus: 'Овощи',
  url: 'https://res.cloudinary.com/jeerjmin/image/upload/v1534038533/pizza-test/tomato.png'
}
]

module.exports = {
    AdminProfile: AdminProfile,
    Fillings: Fillings
};
