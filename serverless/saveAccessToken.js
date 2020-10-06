'use strict';
const axiosBase = require('axios');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
// Set the region and create the DynamoDB service object
AWS.config.update({region: 'ap-northeast-1'});
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const crypto = require('crypto');

module.exports.saveAccessToken = async (event, context, callback) => {
  /* --- Check if the given signature is correct or not --- */
  const checkSignature = function(json) {
      const temp = JSON.parse(JSON.stringify(json));
      console.log(`checkSignature ${JSON.stringify(temp)}`);
      if (typeof temp.hmac === 'undefined') return false;
      const sig = temp.hmac;
      console.log(`sig ${sig}`);
      delete temp.hmac;
      const msg = Object.entries(temp).sort().map(e => e.join('=')).join('&');
      console.log(`msg ${msg}`);
      const hmac = crypto.createHmac('sha256', process.env.REACT_APP_SHOPIFY_API_SECRET);
      hmac.update(msg);
      const signature =  hmac.digest('hex');
      console.log(`signature ${signature}`);
      return signature === sig ? true : false;
  };

  if(!checkSignature(event.queryStringParameters)){
    console.log('invalid signature')
  }

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
