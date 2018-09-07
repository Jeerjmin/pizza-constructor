import React, { Component } from 'react';
import Auth from '../../modules/Auth'
import AdminPizzaElement from '../../components/Admin/AdminPizzaElement'

import {connect} from 'react-redux';

@connect(
    state => ({
        auth: state.AuthStore,
    }),  {}
  )
export default class AdminPizzaList extends Component {

  makeAdminList = () => {

      if (this.props.adminList.hasOwnProperty('pizzas')) {
          const Pizzas = this.props.adminList.pizzas.reverse().map((pizza,i) => {
              return(
                <div key={i}>
                  <AdminPizzaElement
                      updateStatus={this.props.updateStatus}
                      name={pizza.name}
                      price={pizza.price}
                      amount={pizza.amount}
                      status={pizza.status}
                      fillings={pizza.fillings}
                      id={pizza._id}
                  />
                </div>
              )
          })
          return Pizzas
      }
  }

  render() {
      console.log('AdminPizzaList render')
      if (this.props.auth.loaded) {
        return (
            <div className="admin_pizza_list">
                <h3>Список заказов</h3>
                {this.makeAdminList()}
            </div>
        );
      } else {

          return(
              <div>
                  <p>Hello, you are not logged in.</p>
              </div>
          )

      }
  }
}
