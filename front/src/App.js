import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './helpers/history';
// components
import ProductList from './components/ProductList.jsx';
import ProductDetails from './components/ProductDetails.jsx';

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={ProductList} />
        <Route exact path='/product/:productId' component={ProductDetails} />
      </Switch>
    </Router>
  );
}