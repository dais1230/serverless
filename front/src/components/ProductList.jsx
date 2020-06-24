import React, {useState} from 'react';
import {
  Link,
  List,
  Page
} from '@shopify/polaris';

export default function ProductList() {
  const [products] = useState([
    {id: 1, name: "product A"},
    {id: 2, name: "product B"}
  ]);

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