import { combineReducers } from 'redux'
import {
  ADD_PRODUCT,
  // TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from '../actions/index'
const { SHOW_ALL } = VisibilityFilters

const initialState = {
  products: [
    {id: 1, name: "product A"},
    {id: 2, name: "product B"}
  ],
  selectedProducts: []
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function productReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        selectedProducts: [...state.selectedProducts, action.product]
      }
    // case TOGGLE_TODO:
    //   return state.map((todo, index) => {
    //     if (index === action.index) {
    //       return Object.assign({}, todo, {
    //         completed: !todo.completed
    //       })
    //     }
    //     return todo
    //   })
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  productReducer
})

export default todoApp