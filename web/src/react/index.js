import React from 'react';
import ReactDom from 'react-dom';


import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {HashRouter, Route} from 'react-router-dom';

import reducer from './redux/index.js';
import './style/style.css';
import './style/style.styl';
import App from 'lazy!./content/app.js';


const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));


ReactDom.render(
  (<Provider store={store}>
    <HashRouter>
      <Route path='/' component={App}></Route>
      {/* <div>
                <App></App>
            
            </div> */}
    </HashRouter>
  </Provider>),
  document.getElementById('app'),
);
