'use strict';
const axiosBase = require('axios');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
// Set the region and create the DynamoDB service object
AWS.config.update({region: 'ap-northeast-1'});
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

module.exports.saveAccessToken = async (event, context, callback) => {
  const axios = axiosBase.create({
    baseURL: `https://${event["queryStringParameters"]["shopOrigin"]}/admin/oauth/access_token`,
    headers: {
      "Content-Type": "application/json"
    },
    responseType: 'json'
  })

  const res = await axios.post('/', {
    client_id: event["queryStringParameters"]["clientId"],
    client_secret: event["queryStringParameters"]["clientSecret"],
    code: event["queryStringParameters"]["code"]
  })

  const params = {
    TableName: 'Shop',
    Item: {
      id : {S: uuidv4()},
      shopName: {S: event["queryStringParameters"]["shopOrigin"]},
      accessToken: {S: res.data.access_token}
    }
  };

  ddb.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(res.data),
  };

  return response;
};
