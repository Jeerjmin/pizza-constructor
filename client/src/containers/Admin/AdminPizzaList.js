import React, { Component } from 'react';
import Auth from '../../modules/Auth'
import AdminPizzaElement from '../../components/Admin/AdminPizzaElement'

class AdminPizzaList extends Component {

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
      if (!Auth.isUserAuthenticated()) {
          return(
              <div>
                  <p>Hello, you are not logged in.</p>
              </div>
          )
      } else {
          return (
              <div className="admin_pizza_list">
                  {this.makeAdminList()}
              </div>
          );
      }
  }
}

export default AdminPizzaList;
