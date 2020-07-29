import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './helpers/history';

// components
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Purchase from './components/Purchase';

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={ProductList} />
        <Route exact path='/product/:productId' component={ProductDetails} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/purchase' component={Purchase} />
      </Switch>
    </Router>
  );
}