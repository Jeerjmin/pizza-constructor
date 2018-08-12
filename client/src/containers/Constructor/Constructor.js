import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import FillingList from './FillingsList'
import {getFillings} from '../../actions'

class Constructor extends Component {

  createLists = (fillings) => {
      const List = new Array(fillings.length);
      for (let prop in fillings) {
          List.push(
              <FillingList
                  key = {fillings[prop][0]._id}
                  category = {fillings[prop][0].typeRus}
                  fillings = {fillings[prop]}
              />)
      }
      return List;
  }

  componentDidMount() {
      this.props.getFillings()
  }

  render() {
      console.log('Constructor.js render')
      const {fillings} = this.props
      return (
          <section className="сonstructor">
              <h1>Выберите ингридиенты</h1>
              {this.createLists(fillings)}
          </section>
      )
  }
}

const mapStateToProps = (state) => ({
    fillings: state.FillingsStore.fillings,
    loading: state.FillingsStore.isFetching
})

const matchDispatchToProps = (dispatch) => bindActionCreators(
    { getFillings },
    dispatch
);

export default connect(mapStateToProps, matchDispatchToProps)(Constructor);
