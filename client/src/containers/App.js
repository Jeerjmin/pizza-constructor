import React, { Component } from 'react';
import { Route} from 'react-router-dom'
import Constructor from './Constructor/Constructor'
import InterfacePizza from './Pizza/InterfacePizza'
import OrderPanel from './Panel'
import {authLoad} from '../actions'
import { withCookies } from 'react-cookie'
import {connect} from 'react-redux';

import '../style2/index.scss'

const AddPropsToRoute = (WrappedComponent, passedProps)=>{
    return (
        class Route extends Component{
            render(){
                let props = Object.assign({}, this.props, passedProps)
                return  <WrappedComponent {...props} />
            }
        }
    )
}

@connect(
    state => ({ }),
    { authLoad}
  )
class App extends Component {

    componentDidMount() {
      this.props.authLoad()
    }

    render() {
        console.log('App.js render')
        return (
            <section className="app">
                <Constructor />
                <InterfacePizza />
                <Route path='/' component={AddPropsToRoute(OrderPanel, this.props.cookies)} />
            </section>
        );
    }
}

export default withCookies(App);
