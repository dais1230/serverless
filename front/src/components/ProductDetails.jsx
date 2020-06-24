import React from 'react';
import {Button, Page} from '@shopify/polaris';

export default function ProductDetails(props) {
  return (
    <div>
      <Page>
        <p>{props.name}</p>
        <Button>購入する</Button>
      </Page>
    </div>
  );
}