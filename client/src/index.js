import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {CookiesProvider} from 'react-cookie'
import { Router, Route} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import {store} from './config/store'
import history from './config/history'
import App from './containers/App';

ReactDOM.render(
  <CookiesProvider>
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' render={() => <App />} />
    </Router>
  </Provider>,
  </CookiesProvider>,
  document.getElementById('root'));
registerServiceWorker();
