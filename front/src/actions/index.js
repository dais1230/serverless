import axiosBase from 'axios';

/*
 * action types
 */

export const SAVE_ACCESS_TOKEN_PENDING = 'SAVE_ACCESS_TOKEN_PENDING'
export const SAVE_ACCESS_TOKEN_SUCCESS = 'SAVE_ACCESS_TOKEN_SUCCESS'
export const SAVE_ACCESS_TOKEN_ERROR = 'SAVE_ACCESS_TOKEN_ERROR'
export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/*
 * action creators
 */

export function saveAccessToken(query) {
  return async dispatch => {
    dispatch(saveAccessTokenPending())
    const clientId = process.env.REACT_APP_SHOPIFY_API_KEY
    const clientSecret = process.env.REACT_APP_SHOPIFY_API_SECRET
    const code = query.code
    const shopOrigin = query.shop
    const axios = axiosBase.create({
      baseURL: process.env.REACT_APP_SAVE_ACCESS_TOKEN_ENDPOINT,
      headers: {
        "Content-Type": "application/json"
      },
      responseType: "json"
    })
    await axios.get(`/?clientId=${clientId}&clientSecret=${clientSecret}&code=${code}&shopOrigin=${shopOrigin}`)
                .then(res => {
                  console.log(res)
                  dispatch(saveAccessTokenSuccess(res.data.access_token))
                })
                .catch(err => {
                  dispatch(saveAccessTokenError(err))
                })
  }
}

export function saveAccessTokenPending() {
  return { type: SAVE_ACCESS_TOKEN_PENDING }
}

export function saveAccessTokenSuccess(accessToken) {
  return { type: SAVE_ACCESS_TOKEN_SUCCESS, accessToken }
}

export function saveAccessTokenError(error) {
  return { type: SAVE_ACCESS_TOKEN_ERROR, error }
}

export function fetchProducts(token) {
  return async dispatch => {
    dispatch(fetchProductsPending())
    const apiKey = process.env.REACT_APP_SHOPIFY_API_KEY
    const accessToken = token
    const shopName = process.env.REACT_APP_SHOP_ORIGIN
    const axios = axiosBase.create({
      baseURL: process.env.REACT_APP_FETCH_PRODUCTS_ENDPOINT,
      headers: {
        "Content-Type": "application/json"
      },
      responseType: "json"
    })
    await axios.get(`/?accessToken=${accessToken}&apiKey=${apiKey}&shopName=${shopName}`)
                .then(res => {
                  console.log(res)
                  dispatch(fetchProductsSuccess(res.data))
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
