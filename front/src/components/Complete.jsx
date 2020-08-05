import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Page } from '@shopify/polaris';
import Header from './Header';

const Complete = () => {
  return (
    <div>
      <Header />
      <Page>
        <p>購入ありがとうございます。</p>
        <Button><Link to={'/'}>ホーム画面へ</Link></Button>
      </Page>
    </div>
  )
}

export default Complete
