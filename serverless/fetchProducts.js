'use strict';
const Shopify = require('shopify-api-node');
const AWS = require('aws-sdk');
// Set the region and create the DynamoDB service object
AWS.config.update({region: 'ap-northeast-1'});
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

module.exports.fetchProducts = async (event, context, callback) => {
  let lambda = new AWS.Lambda({region: 'ap-northeast-1'})
  const param = {
    FunctionName: "serverless-default-validateSessionToken", // Lambda 関数の ARN を指定
    Payload: JSON.stringify(event)
  };

  lambda.invoke(param, (error, data) => {
    if (error) {
      context.done('error', error);
    }
    if(data.Payload){
      context.succeed(data.Payload)
    }
  });

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
