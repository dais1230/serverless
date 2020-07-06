import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button,
  Page
} from '@shopify/polaris';
import { addProduct } from '../actions/index';
import Header from './Header';

const ProductDetails = ({ addProduct }) => {
  let { productId } = useParams();

  const handleClick = () => {
    addProduct({id: 3, name: "product C"})
  }

  return (
    <div>
      <Header />
      <Page>
        <p>{productId}</p>
        <Button onClick={handleClick}>カートに追加</Button>
      </Page>
    </div>
  )
}

const mapStateToProps = state => ({
  products: state.productReducer.products,
})

const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(addProduct(product))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails)
