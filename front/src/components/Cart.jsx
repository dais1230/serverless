import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  List,
  Page
} from '@shopify/polaris';
import { addProduct } from '../actions/index';
import Header from './Header';

const Cart = ({ products }) => {
  var purchaseButton;
if (products.length > 0) {
  purchaseButton = <Link to={'/purchase'}>購入画面へ</Link>;
} else {
  purchaseButton = <p>追加された商品はありません</p>;
}

  return (
    <div>
      <Header />
      <Page>
        <p>カート一覧</p>
        <List sectioned>
          {products.map((p, index) => (
            <List.Item key={index}>
              <p>{p.name}</p>
            </List.Item>
          ))}
        </List>
        {purchaseButton}
      </Page>
    </div>
  )
}

const mapStateToProps = state => ({
  products: state.productReducer.selectedProducts
})

const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(addProduct(product))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
