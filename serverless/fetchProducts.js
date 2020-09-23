'use strict';
const Shopify = require('shopify-api-node');

module.exports.fetchProducts = async (event, context, callback) => {
  const shopify = new Shopify({
    shopName: event["queryStringParameters"]["shopName"],
    accessToken: event["queryStringParameters"]["accessToken"],
  });

  const params = { limit: 10 };

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