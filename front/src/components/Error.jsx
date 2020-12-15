import React from 'react';
import { Page } from '@shopify/polaris';
import Header from './Header';
import { useEffect } from 'react';

const Error = () => {
  useEffect(() => {
    const fn = function() {
      console.log(process.env.REACT_APP_SHOP_ORIGIN)
      window.location.assign(`https://${process.env.REACT_APP_SHOP_ORIGIN}/admin/apps`)
    };
    setTimeout(fn, 5000);
  })

  return (
    <div>
      <Header />
      <Page>
        <p>エラーが発生しました。</p>
      </Page>
    </div>
  )
}

export default Error
