import axios from 'axios';
import {
  fetchProductsPending,
  fetchProductsSuccess,
  fetchProductsError
} from './index';

export function fetchProducts() {
  console.log('aaa')
  return dispatch => {
    dispatch(fetchProductsPending());
    axios.get('https://d0jetp9lk6.execute-api.ap-northeast-1.amazonaws.com/default/lambda_serverless_handler')
          .then(res => dispatch(fetchProductsSuccess(res.data)))
          .catch(err => dispatch(fetchProductsError(err)))
  }
}

