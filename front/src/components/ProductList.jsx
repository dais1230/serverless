import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  List,
  Page
} from '@shopify/polaris';

import { addProduct } from '../actions/index';

const ProductList = ({ products }) => {
  return (
    <div>
      <Page>
        <List sectioned>
          {products.map(p => (
            <List.Item key={p.id}>
              <Link to={`/product/${p.id}`}>{p.name}</Link>
            </List.Item>
          ))}
        </List>
      </Page>
    </div>
  )
}

const mapStateToProps = state => ({
  products: state.productReducer.products,
})

const mapDispatchToProps = dispatch => ({
  addProduct: data => dispatch(addProduct(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)
