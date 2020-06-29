import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  List,
  Page
} from '@shopify/polaris';

import { createStore } from 'redux'
import todoApp from '../reducers/index'
import {
  addTodo
} from '../actions/index'

const store = createStore(todoApp)

export default function ProductList() {
  const [products] = useState([
    {id: 1, name: "product A"},
    {id: 2, name: "product B"}
  ]);

  // console.log(store.getState())
  // store.dispatch(productReducer({id: 3, name: "product C"}))

  function click () {
    store.dispatch(addTodo('new'))
    console.log(store.getState())
  }
  // function goProductDetail(id) {
  //   store.dispatch(goProductDetail(id))
  // }

  return (
    <div>
      <Page>
        <List sectioned>
          {products.map(p => (
            <List.Item key={p.id}>
              <Link to={`/product/${p.id}`}>{p.name}</Link>
            </List.Item>
          ))}
        </List>
        <Button onClick={click}>購入する</Button>
      </Page>
    </div>
  );
}