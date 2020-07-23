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
    const fetchData = async () => {
      const response = await axios.get('https://d0jetp9lk6.execute-api.ap-northeast-1.amazonaws.com/default/lambda_serverless_handler');
      
      const title = response.data
    	console.log(response.data);
    }
    
    fetchData();
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
