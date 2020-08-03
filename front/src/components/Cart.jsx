import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  List,
  Page
} from '@shopify/polaris';
import Header from './Header';

const Cart = ({ selectedProducts }) => {
  let purchaseButton;
  if (selectedProducts.length > 0) {
    purchaseButton = <Link to={'/purchase'}>購入画面へ</Link>;
  } else {
    purchaseButton = <p>追加された商品はありません</p>;
  }

  const totalPrice = () => {
    let totalPrice = 0
    selectedProducts.map(sp => {
      return totalPrice += parseInt(sp.price, 10)
    })
    return totalPrice
  }

  return (
    <div>
      <Header />
      <Page>
        <p>カート一覧</p>
        <List sectioned>
          {selectedProducts.map((p, index) => (
            <List.Item key={index}>
              <p>{p.title} / {p.price}円</p>
              <img alt="product_img" src={p.images} width="64px" height="64px" />
            </List.Item>
          ))}
        </List>
          <p>合計金額 {totalPrice()}円</p>
        {purchaseButton}
      </Page>
    </div>
  )
}

const mapStateToProps = state => ({
  selectedProducts: state.productReducer.selectedProducts
})

export default connect(
  mapStateToProps
)(Cart)
