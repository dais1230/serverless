import React, {useState} from 'react';
import {
  Link,
  List,
  Page
} from '@shopify/polaris';

import { createStore } from 'redux'
import productReducer from '../reducer/productReducer'

const store = createStore(productReducer)

export default function ProductList() {
  const [products] = useState([
    {id: 1, name: "product A"},
    {id: 2, name: "product B"}
  ]);

  store.dispatch(productReducer({id: 3, name: "product C"}))

  return (
    <div>
      <Page>
        <List sectioned>
          {products.map(p => (
            <List.Item key={p.id}>
              <p><Link url={`/product/${p.id}`}>{p.name}</Link></p>
            </List.Item>
          ))}
        </List>
      </Page>
    </div>
  );
}