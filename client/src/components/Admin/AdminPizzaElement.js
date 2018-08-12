import React, { PureComponent } from 'react';
import AdminFilling from './AdminFilling'

class PizzaElement extends PureComponent {

  state = {
      status: '',
      typeOfStatus:['В ожидание','В работе','В пути',"Выполнен"]
  }

  componentDidMount() {
      this.setState({ status: this.props.status })
  }

  listChange = (e,id) => {
      this.setState({ status: e.target.value });
      this.props.updateStatus(e.target.value,id)
  }

  makeFillingsList = (fillings) => {
    const Fillings = []
    for (let prop in fillings) {
      if  ((prop !== 'Dough') && (prop !== 'Sauce')) {
        Fillings.push(
          <AdminFilling
              key={fillings[prop]._id}
              url={fillings[prop].url}
              name={fillings[prop].nameRus}
              size={fillings[prop].size}
              count={fillings[prop].count}
              type={fillings[prop].type}
          />
        )
    }
  }
  if ((fillings.hasOwnProperty('Dough')) && (fillings.hasOwnProperty('Sauce'))) {
    Fillings.unshift(
        <AdminFilling
          key={fillings.Dough._id}
          name={`${fillings.Dough.size} ${fillings.Sauce.nameRus}`}
          url = {fillings.Dough.url}
          />
    )
}
return Fillings
}

  render() {
      console.log('AdminPizzaElement.js')
      const {name,price,amount,fillings,id} = this.props
      return (
          <div className="admin_pizza_el">
              <p><b>Название пиццы:</b> {name}</p>
              <p><b>Итоговая сумма: </b>{price} руб.</p>
              <p><b>Кол-во: </b>{amount}</p>
              <div>
                  <label >Статус: </label>
                  <select value={this.state.status} onChange={(event) => this.listChange(event,id)}>
                      {this.state.typeOfStatus.map((name,index)=> {
                          return (<option key={index} value={name}>{name}</option>)
                      })}
                  </select>
              </div>
              <div className="admin_pizza_fillings_list">
                  {this.makeFillingsList(fillings)}
              </div>
          </div>
      );
  }
}

export default PizzaElement;
