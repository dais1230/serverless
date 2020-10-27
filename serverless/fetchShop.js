'use strict';
const AWS = require('aws-sdk');
// Set the region and create the DynamoDB service object
AWS.config.update({region: 'ap-northeast-1'});
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

module.exports.fetchShop = async (event, context, callback) => {
  const params = {
    TableName: 'Shop',
    Key: {
      shopName: {
        S: event["queryStringParameters"]["shopOrigin"]
      }
    }
  }

  let res = {}
  let shopExist = false

  await ddb.getItem(params, function(err, data) {
    if (err) {
      console.log("err", err);
    } else {
      res = data
    }
  }).promise();

  if (Object.keys(res).length !== 0) {
    shopExist = true
  }

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({shopExist}),
  };

  return response;
};
