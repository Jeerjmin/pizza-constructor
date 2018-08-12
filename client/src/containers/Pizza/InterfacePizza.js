import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import PizzaElement from '../../components/Pizza/PizzaElement'
import PizzaBaseElement from '../../components/Pizza/PizzaBaseElement'
import {getAdminList,addCountFill, addCount, removeCountFill, removeCount, sendPizza} from '../../actions'

//сделать отдельный элемент, чтобы не было перерендера
//всего ком-та ради 1 каунта

class InterfacePizza extends Component {

  state = {
      pizzaName: ''
  }

  nameChange = (event) => {
      this.setState({
          pizzaName:event.target.value
      })
  }

  addCountFill = (kind) => {
      this.props.addCountFill(kind)
  }

  removeCountFill = (kind) => {
      this.props.removeCountFill(kind)
  }

  toOrder = (pizza) => {
      this.props.sendPizza(pizza, this.state.pizzaName)
  }

  makePizza = (pizza) => {
      const Pizza = []
      for (let prop in pizza) {
          if ((prop !== 'property') && (prop !== 'Dough') && (prop !== 'Sauce')  && (typeof(pizza[prop]) !== 'string')) {
              Pizza.push(
                  <PizzaElement
                      key = {pizza[prop]._id}
                      type = {prop}
                      name = {pizza[prop].nameRus}
                      price = {pizza[prop].price}
                      size = {pizza[prop].size}
                      count = {pizza[prop].count}
                      url = {pizza[prop].url}
                      addCount = {this.addCountFill}
                      removeCount = {this.removeCountFill}
                  />
              )
          }
      }
      if ((pizza.hasOwnProperty('Dough')) && (pizza.hasOwnProperty('Sauce'))) {
          Pizza.unshift(
              <PizzaBaseElement
                  key={pizza.Dough._id}
                  name={`${pizza.Dough.size} ${pizza.Sauce.nameRus}`}
                  price = {pizza.Dough.price}
                  url = {pizza.Dough.url}
              />)
      }
      return Pizza
  }

  render() {
      const {pizza} = this.props
      console.log('InterfacePizzaRender', pizza)

      return (
          <article className="pizza">
              <header>
                  <h1>Ваша пицца</h1>
              </header>
              <section className="pizza_fillings_grid">
                  {this.makePizza(pizza)}
              </section>
              <div className="pizza_property">
                  <div className="pizza_property_count">
                    <input className="count pizza_property_count_remove" type="button" value="-" onClick={this.props.removeCount}/>
                    <p>Кол-во: {pizza.property.amount}</p>
                    <input className="count pizza_property_count_add" type="button" value="+" onClick={this.props.addCount}/>
                </div>
                  <div><p><b>Итоговая цена: {pizza.property.price}</b></p></div>
                  <div>Дайте название вашей пицце</div>
                  <input className="pizza_input_name" type="text" value={this.state.pizzaName} onChange={this.nameChange} />
              </div>
              <input className="pizza_button_order" type='button' onClick={() => {this.toOrder(pizza)}} value="Заказать"/>
              <p>{pizza.successMessage}</p>
          </article>
      );

  }
}

const mapStateToProps = (state) => ({
    pizza: state.PizzaStore
})

const matchDispatchToProps = (dispatch) => bindActionCreators(
    {addCountFill, removeCountFill, addCount, removeCount, sendPizza,getAdminList },
    dispatch
);

export default connect(mapStateToProps, matchDispatchToProps)(InterfacePizza);
