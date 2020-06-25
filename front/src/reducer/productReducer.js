import { ADD_PRODUCT } from '../constants/actionTypes'

const initialState = {
  products: [],
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: action.payload.products
      }
    default:
      return state
  }
}
