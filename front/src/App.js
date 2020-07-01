import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './helpers/history';
// components
import ProductList from './components/ProductList.jsx';
import ProductDetails from './components/ProductDetails.jsx';
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
        </Switch>
      </Router>
    </Provider>
  );
}