import React from 'react';
import ReactDom from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import routes from './routes.jsx';

import { Router } from 'react-router-dom';
import  history from './history.js';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from './store/reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers(reducers), 
  composeEnhancers(applyMiddleware(thunk))
);

ReactDom.render(
  <Provider store={ store }>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Router history={history}>
        {routes}
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('react-app')
);
