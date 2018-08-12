import React, { Component } from 'react';
import { Route} from 'react-router-dom'
import Constructor from './Constructor/Constructor'
import InterfacePizza from './Pizza/InterfacePizza'
import AdminPanel from './Admin/Admin'
import '../style2/index.scss'

class App extends Component {
    render() {
        console.log('App.js render')
        return (
            <section className="app">
                <Constructor />
                <InterfacePizza />
                <Route path='/' component={AdminPanel} />
            </section>
        );
    }
}

export default App;
