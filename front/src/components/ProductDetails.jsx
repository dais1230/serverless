import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button,
  Page
} from '@shopify/polaris';
import { addProduct, fetchProducts } from '../actions/index';
import Header from './Header';

const ProductDetails = ({ products, fetchProducts, addProduct }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // for preventing infinite loop, make second useEffect for setting product
  useEffect(() => {
    if (products) {
      setProduct(products.find(p => p.id === parseInt(productId, 10)))
    }
  }, [products, productId])

  const handleClick = () => {
    fetchProducts()
    addProduct(product)
  }

  return (
    <div>
      <Header />
      <Page>
        {product &&
          <div>
            <p>{product.title} / {product.price}円</p>
            <img alt="product_img" src={product.images} width="64px" height="64px" />
          </div>
        }
        <Button onClick={handleClick}>カートに追加</Button>
      </Page>
    </div>
  )
}

const mapStateToProps = state => ({
  products: state.productReducer.products,
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  addProduct: product => dispatch(addProduct(product))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails)
