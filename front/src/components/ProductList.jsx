import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  List,
  Page
} from '@shopify/polaris';

import { addProduct } from '../actions/index';
import { fetchProducts } from '../actions/fetchProducts';
import Header from './Header';

const ProductList = ({ products }) => {

  useEffect(() => {
    fetchProducts()
  }, []);

  return (
    <div>
      <Header />
      <Page>
        <List sectioned>
          {products.map((p, index) => (
            <List.Item key={index}>
              <Link to={`/product/${p.id}`}>{p.name}</Link>
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
  fetchProducts: () => dispatch(fetchProducts()),
  addProduct: data => dispatch(addProduct(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)
