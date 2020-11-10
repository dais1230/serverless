'use strict';
const Shopify = require('shopify-api-node');
const AWS = require('aws-sdk');
// Set the region and create the DynamoDB service object
AWS.config.update({region: 'ap-northeast-1'});
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const jwt_decode = require('jwt-decode');
const isVerified = require("shopify-jwt-auth-verify")['default']

module.exports.fetchProducts = async (event, context, callback) => {
  if (!event) {
    return
  }
  if (event.headers.Authorization) {
    const decoded = jwt_decode(event.headers.Authorization.split(' ')[1])
    if (Date.now() >= decoded.exp * 1000) {
      return
    }
    if (Date.now() <= decoded.nbf * 1000) {
      return
    }
    if (decoded.dest !== `https://${event["queryStringParameters"]["shopName"]}`) {
      return
    }
    if (decoded.aud !== event["queryStringParameters"]["apiKey"]) {
      return
    }

    const verified = isVerified(event.headers.Authorization, event["queryStringParameters"]["apiSecret"])
    if (!verified) {
      return
    }
  }

  const params = {
    TableName: 'Shop',
    Key: {
      shopName: {
        S: event["queryStringParameters"]["shopName"]
      }
    }
  }

  let res = {}

  await ddb.getItem(params, function(err, data) {
    if (err) {
      console.log("err", err);
    } else {
      res = data
    }
  }).promise();

  const shopify = await new Shopify({
    shopName: event["queryStringParameters"]["shopName"],
    accessToken: res.Item.accessToken.S
  });

  const products = await shopify.product.list({ limit: 10 });

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS"
    },
    body: JSON.stringify({products}),
  };

  return response;
};
