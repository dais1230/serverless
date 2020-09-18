'use strict';
const axiosBase = require('axios');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

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

  // Set the region
  AWS.config.update({region: 'REGION'});

  // Create the DynamoDB service object
  var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var params = {
    TableName: 'Shop',
    Item: {
      'id' : {S: '001'}
    }
  };

  // Call DynamoDB to add the item to the table
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
