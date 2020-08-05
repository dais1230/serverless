import { combineReducers } from 'redux'
import {
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  ADD_PRODUCT,
  REMOVE_PRODUCT
} from '../actions/index'

const initialState = {
  error: null,
  pending: false,
  products: [],
  selectedProducts: []
}

function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_PENDING:
      return {
        ...state,
        pending: true
      }
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        pending: false,
        products: action.products
      }
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    case ADD_PRODUCT:
      return {
        ...state,
        selectedProducts: [...state.selectedProducts, action.product]
      }
    case REMOVE_PRODUCT:
      const index = state.selectedProducts.findIndex(p => p.id === action.id)
      // index = -1 (該当するproductが見つからなかった場合)を除く
      if (index >= 0) {
        state.selectedProducts.splice(index, 1)
      }
      return {
        ...state,
        selectedProducts: [...state.selectedProducts]
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  productReducer
})

export default rootReducer