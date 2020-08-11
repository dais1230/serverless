import axios from 'axios'

/*
 * action types
 */

export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/*
 * action creators
 */

export function fetchProducts() {
  return async dispatch => {
    dispatch(fetchProductsPending())
    await axios.get('https://o3au5rbodj.execute-api.ap-northeast-1.amazonaws.com/default/serverless-default-fetchProducts')
          .then(res => {
            dispatch(fetchProductsSuccess(res.data))
            console.log(res)
          })
          .catch(err => {
            dispatch(fetchProductsError(err))
          })
  }
}

export function fetchProductsPending() {
  return { type: FETCH_PRODUCTS_PENDING }
}

export function fetchProductsSuccess(products) {
  return { type: FETCH_PRODUCTS_SUCCESS, products }
}


export function fetchProductsError(error) {
  return { type: FETCH_PRODUCTS_ERROR, error }
}

export function addProduct(product) {
  return { type: ADD_PRODUCT, product }
}

export function removeProduct(id) {
  return { type: REMOVE_PRODUCT, id }
}
