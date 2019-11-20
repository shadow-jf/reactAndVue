import React from 'react';
import ReactDom from 'react-dom';


import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, HashRouter, Route, Redirect, Switch } from 'react-router-dom';

import reducer from './redux/index.js';
import './style/style.css';
import './style/style.styl';



const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

import p1 from './image/1.jpg';
import App from 'lazy!./content/app.js';



ReactDom.render(
    (<Provider store={store}>
        <HashRouter>
        <Route path='/' component={App}></Route>
            {/* <div>
                <App></App>
            
            </div> */}
        </HashRouter>
    </Provider>),
    document.getElementById('app')
)
