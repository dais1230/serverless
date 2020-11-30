import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  List,
  Page
} from '@shopify/polaris';

import { fetchProducts, validateSessionToken } from '../actions/index';
import Header from './Header';

const ProductList = ({ accessToken, products, fetchProducts, validateSessionToken }) => {
  useEffect(() => {
    validateSessionToken(accessToken)
  }, [validateSessionToken])

  useEffect(() => {
    fetchProducts(accessToken)
  }, [fetchProducts]);

  return (
    <div>
      <Header />
      <Page>
        <List type="number" sectioned>
          {products && products.map((p, index) => (
            <List.Item key={index}>
              <Link to={`/product/${p.id}`}>
                <p>{p.title} / {p.variants[0].price}円</p>
                <img alt="product_img" src={p.images[0].src} width="64px" height="64px" />
              </Link>
            </List.Item>
          ))}
        </List>
      </Page>
    </div>
  )
}

const mapStateToProps = state => ({
  accessToken: state.authReducer.accessToken,
  products: state.productReducer.products
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: accessToken => dispatch(fetchProducts(accessToken)),
  validateSessionToken: accessToken => dispatch(validateSessionToken(accessToken))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)
