import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  List,
  Page
} from '@shopify/polaris';

import { validateSessionToken } from '../actions/index';
import Header from './Header';

const ProductList = ({ accessToken, sessionToken, products, validateSessionToken }) => {
  useEffect(() => {
    validateSessionToken(accessToken, sessionToken, true)
  }, [validateSessionToken, accessToken, sessionToken]);


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
  sessionToken: state.sessionReducer.sessionToken,
  products: state.productReducer.products
})

const mapDispatchToProps = dispatch => ({
  validateSessionToken: (accessToken, sessionToken, fetchProducts) => dispatch(validateSessionToken(accessToken, sessionToken, fetchProducts)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)
