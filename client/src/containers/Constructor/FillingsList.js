import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import Filling from '../../components/Fillings/Filling'
import BaseFilling from '../../components/Fillings/BaseFilling'
import {chooseBaseFillings, chooseFillings} from '../../actions'

class FillingsList extends Component {

  state = {
      isChecked: 0
  }

  handleBaseFill = (event) => {
      this.setState({ isChecked: event.target.value });
      this.props.chooseBaseFillings(this.props.fillings[event.target.value])
  }

  handleFill = (data, count) => {
      this.props.chooseFillings(data, count)
  }

  createFilling = (fillings) => {
      const Fillings = fillings.map((filling,index) => {
          if (filling.type === 'Dough' || filling.type === 'Sauce') {
              return(
                      <BaseFilling
                          key={index}
                          id = {index}
                          name = {filling.nameRus}
                          price = { (filling.price) ? `${filling.price} руб` : '' }
                          weight = { (filling.weight) ? filling.weight : '' }
                          size = { (filling.size) ? filling.size : '' }
                          handleBaseFill = {this.handleBaseFill}
                          isChecked = {this.state.isChecked}
                          url = {filling.url}
                      />
              )
          } else {
              return(
                      <Filling
                          key={index}
                          id = {index}
                          filling = {filling}
                          name = {filling.nameRus}
                          price = { (filling.price) ? `${filling.price} руб` : '' }
                          weight = { (filling.weight) ? filling.weight : '' }
                          size = { (filling.size) ? filling.size : '' }
                          count = {filling.count}
                          url = {filling.url}
                          handleFill = {this.handleFill}
                      />
              )
          }
      })
      return Fillings
  }

  componentDidMount() {
      if (this.props.fillings[0].type === 'Dough' || this.props.fillings[0].type === 'Sauce')
          this.props.chooseBaseFillings(this.props.fillings[this.state.isChecked])
  }

  render() {
      console.log('FillingsList render')
      const {category,fillings} = this.props
      return (
        <article>
          <header>
            <h3>{category}</h3>
          </header>
              <section className="constr_fillings_list">
                  {this.createFilling(fillings)}
              </section>
        </article>
      );
  }
}

const mapStateToProps = (state) => ({})

const matchDispatchToProps = (dispatch) => bindActionCreators(
    { chooseBaseFillings, chooseFillings },
    dispatch
);

export default connect(mapStateToProps, matchDispatchToProps)(FillingsList);
