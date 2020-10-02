import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {AppProvider} from "@shopify/polaris";
import ja from '@shopify/polaris/locales/ja.json';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../src/reducers/index'
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react'
import createApp from '@shopify/app-bridge';
import { authenticatedFetch } from '@shopify/app-bridge-utils';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

require('dotenv').config()

const app = createApp({
  apiKey: process.env.REACT_APP_SHOPIFY_API_KEY,
  shopOrigin: process.env.REACT_APP_SHOP_ORIGIN
})

const client = new ApolloClient({
  link: new HttpLink({
    credentials: 'same-origin',
    fetch: authenticatedFetch(app), // created in shopify_app.js
    uri: '/graphql'
  }),
  cache: new InMemoryCache()
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk))
const persistor = persistStore(store)


ReactDOM.render(
  <React.StrictMode>
      <AppProvider i18n={ja}>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
          </Provider>
        </ApolloProvider>
      </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
