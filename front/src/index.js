import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {AppProvider} from "@shopify/polaris";
import ja from '@shopify/polaris/locales/ja.json';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { authenticatedFetch } from '@shopify/app-bridge-utils';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import store from './store'
import app from './appBridge'

require('dotenv').config()



const client = new ApolloClient({
  link: new HttpLink({
    credentials: 'same-origin',
    fetch: authenticatedFetch(app)
  }),
  cache: new InMemoryCache()
});

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

export default store;
