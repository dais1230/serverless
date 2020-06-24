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
        <Route path='/' component={ProductList} />
        <Route
          path='/product/:productId'
          render={(p) => (<ProductDetails {...p} />)}
        />
      </Switch>
    </Router>
  );
}