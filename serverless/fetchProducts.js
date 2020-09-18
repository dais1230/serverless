'use strict';
const Shopify = require('shopify-api-node');

module.exports.fetchProducts = (event, context, callback) => {
  const shopify = new Shopify({
    shopName: event["queryStringParameters"]["shopName"],
    apiKey: event["queryStringParameters"]["apiKey"],
    password: event["queryStringParameters"]["accessToken"]
  });

  const products = await shopify.product.list(params);

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({products}),
  };

  return response;
};