/*
 * action types
 */

export const ADD_PRODUCT = 'ADD_PRODUCT'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const GO_PRODUCT_DETAIL = 'GO_PRODUCT_DETAIL'

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

export function addProduct(product) {
  return { type: ADD_PRODUCT, product }
}

export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

export function goProductDetail(productId) {
    return { type: GO_PRODUCT_DETAIL, productId }
}
