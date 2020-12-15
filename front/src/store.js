import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../src/reducers/index'
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk))

export default store
