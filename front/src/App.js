import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './helpers/history';
// components
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Purchase from './components/Purchase';

import { Provider } from 'react-redux';
import { createStore } from 'redux'
import todoApp from '../src/reducers/index'

const store = createStore(todoApp)

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={ProductList} />
          <Route exact path='/product/:productId' component={ProductDetails} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/purchase' component={Purchase} />
        </Switch>
      </Router>
    </Provider>
  );
}