import React from 'react';
import { Button, Page } from '@shopify/polaris';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  let { productId } = useParams();

  return (
    <div>
      <Page>
        <p>{productId}</p>
        <Button>購入する</Button>
      </Page>
    </div>
  );
}