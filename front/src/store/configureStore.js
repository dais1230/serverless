import { createStore } from 'redux'
import addProduct from '../reducer/productReducer'

const store = createStore(addProduct)

console.log(store.getState())