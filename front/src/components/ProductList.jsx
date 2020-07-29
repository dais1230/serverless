import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  List,
  Page
} from '@shopify/polaris';

import { fetchProducts, addProduct } from '../actions/index';
import Header from './Header';

const ProductList = ({ products }) => {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   axios.get('https://d0jetp9lk6.execute-api.ap-northeast-1.amazonaws.com/default/lambda_serverless_handler')
  //         .then(res => {
  //           console.log(res.data)
  //           setProducts(res.data)
  //         })
  //         .catch(err => {
  //           console.log(err)
  //         })
  // }, []);

  useEffect(() => {
    fetchProducts()
  }, []);
  console.log(products)

  return (
    <div>
      <Header />
      <Page>
        <List type="number" sectioned>
          {products && products.map((p, index) => (
            <List.Item key={index}>
              <Link to={`/product/${p.id}`}>
                <p>{p.title}</p>
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
  fetchProducts: () => dispatch(fetchProducts()),
  addProduct: data => dispatch(addProduct(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)
