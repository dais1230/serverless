import createApp from '@shopify/app-bridge';

const app = createApp({
  apiKey: process.env.REACT_APP_SHOPIFY_API_KEY,
  shopOrigin: process.env.REACT_APP_SHOP_ORIGIN
})

export default app;
