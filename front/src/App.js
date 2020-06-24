import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './helpers/history';
// components
import List from './components/list';
import Purchase from './components/purchase';

export default class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={List} />
          <Route exact path='/purchase' component={Purchase} />
        </Switch>
      </Router>
    );
  }
}