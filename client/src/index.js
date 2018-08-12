import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import {store} from './config/store'
import history from './config/history'
import App from './containers/App';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App} />
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
