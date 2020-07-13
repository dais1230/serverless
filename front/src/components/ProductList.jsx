import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  List,
  Page
} from '@shopify/polaris';
import axios from 'axios';
import { addProduct } from '../actions/index';
import Header from './Header';

const ProductList = ({ products }) => {

  useEffect(() => {
    axios({
      mode: "cors",
      method: "GET",
      url: "https://bfhu96h1w4.execute-api.ap-northeast-1.amazonaws.com/default/getProducts",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }
    }).then(res => {
      console.log(res.data);
    });
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
  addProduct: data => dispatch(addProduct(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)
