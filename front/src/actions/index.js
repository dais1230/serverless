import axiosBase from 'axios';
import app from '../appBridge'
import { getSessionToken } from '@shopify/app-bridge-utils';
import store from '../store'
import watch from 'redux-watch'
import { history } from '../helpers/history'
/*
 * action types
 */

export const SAVE_SESSION_TOKEN_PENDING = 'SAVE_SESSION_TOKEN_PENDING'
export const SAVE_SESSION_TOKEN_SUCCESS = 'SAVE_SESSION_TOKEN_SUCCESS'
export const SAVE_SESSION_TOKEN_ERROR = 'SAVE_SESSION_TOKEN_ERROR'
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


export function setSessionToken() {
  return async dispatch => {
    dispatch(saveSessionTokenPending())
    await getSessionToken(app)
    .then(res => {
      dispatch(saveSessionTokenSuccess(res))
    })
    .catch(err => {
      dispatch(saveSessionTokenError(err))
    })
  }
}

// watch session token update
let w = watch(store.getState, 'sessionReducer.sessionToken')
store.subscribe(w((newVal, oldVal) => {
  if (newVal !== oldVal && oldVal) {
    const accessToken = store.getState().authReducer.accessToken
    store.dispatch(validateSessionToken(accessToken, newVal, true))
  }
}))

export function saveSessionTokenPending() {
  return { type: SAVE_SESSION_TOKEN_PENDING }
}

export function saveSessionTokenSuccess(sessionToken) {
  return { type: SAVE_SESSION_TOKEN_SUCCESS, sessionToken }
}

export function saveSessionTokenError(error) {
  return { type: SAVE_SESSION_TOKEN_ERROR, error }
}

export function validateSessionToken(accessToken, sessionToken, products = false) {
  return async dispatch => {
    const authorizationHeader = `Bearer ${sessionToken}`
    const apiKey = process.env.REACT_APP_SHOPIFY_API_KEY
    const apiSecret = process.env.REACT_APP_SHOPIFY_API_SECRET
    const shopName = process.env.REACT_APP_SHOP_ORIGIN
    const axios = axiosBase.create({
      baseURL: process.env.REACT_APP_VALIDATE_SESSION_TOKEN_ENDPOINT,
      headers: {
        'Content-Type': 'application/json',
        "Authorization": authorizationHeader
      },
      responseType: 'json'
    })
    await axios.get(`/?apiKey=${apiKey}&apiSecret=${apiSecret}&shopName=${shopName}`)
                .then(res => {
                  if (res.data === 'valid' && products) {
                    dispatch(fetchProducts(accessToken))
                  }
                  if (res.data === 'expired') {
                    dispatch(setSessionToken())
                  }
                })
                .catch(err => {
                  history.push('/error')
                })
  }
}

export function verifyShop(shopOrigin) {
  return async () => {
    const axios = axiosBase.create({
      baseURL: process.env.REACT_APP_FETCH_SHOP_ENDPOINT,
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'json'
    })
    const res = await axios.get(`?shopOrigin=${shopOrigin}`)
    return res.data.shopExist
  }
}

export function saveAccessToken(query) {
  return async dispatch => {
    dispatch(saveAccessTokenPending())
    const clientId = process.env.REACT_APP_SHOPIFY_API_KEY
    const clientSecret = process.env.REACT_APP_SHOPIFY_API_SECRET
    const code = query.code
    const hmac = query.hmac
    const shopOrigin = query.shop
    const axios = axiosBase.create({
      baseURL: process.env.REACT_APP_SAVE_ACCESS_TOKEN_ENDPOINT,
      headers: {
        "Content-Type": "application/json"
      },
      responseType: "json"
    })
    await axios.get(`/?clientId=${clientId}&clientSecret=${clientSecret}&code=${code}&hmac=${hmac}&shopOrigin=${shopOrigin}`)
                .then(res => {
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

export function fetchProducts(accessToken) {
  return async dispatch => {
    dispatch(fetchProductsPending())
    const apiKey = process.env.REACT_APP_SHOPIFY_API_KEY
    const apiSecret = process.env.REACT_APP_SHOPIFY_API_SECRET
    const shopName = process.env.REACT_APP_SHOP_ORIGIN
    const axios = axiosBase.create({
      baseURL: process.env.REACT_APP_FETCH_PRODUCTS_ENDPOINT,
      headers: {
        "Content-Type": "application/json"
      },
      responseType: "json"
    })
    await axios.get(`/?accessToken=${accessToken}&apiKey=${apiKey}&apiSecret=${apiSecret}&shopName=${shopName}`)
                .then(res => {
                  dispatch(fetchProductsSuccess(res.data.products))
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
