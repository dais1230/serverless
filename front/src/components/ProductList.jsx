import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  List,
  Page
} from '@shopify/polaris';

import { fetchProducts } from '../actions/index';
import Header from './Header';

const ProductList = ({ products, fetchProducts }) => {
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts]);

  return (
    <div>
      <Header />
      <Page>
        <List type="number" sectioned>
          {products && products.map((p, index) => (
            <List.Item key={index}>
              <Link to={`/product/${p.id}`}>
                <p>{p.title} / {p.price}円</p>
                <img alt="product_img" src={p.images} width="64px" height="64px" />
              </Link>
            </List.Item>
          ))}
        </List>
      </Page>
    </div>
  )
}

const mapStateToProps = state => ({
  products: state.productReducer.products
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)
