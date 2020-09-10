require 'json'
require 'aws-sdk-dynamodb'
require 'net/http'
require 'uri'

def saveAccessToken(event:, context:)
  uri = URI.parse(`https://#{event["queryStringParameters"]["shopOrigin"]}/admin/oauth/access_token`)
  response = Net::HTTP.post_form(uri, {
    client_id: event["queryStringParameters"]["clientId"],
    client_secret: event["queryStringParameters"]["clientSecret"],
    code: event["queryStringParameters"]["code"]
  })

  headers = {
    "Access-Control-Allow-Origin": "*"
  }

  { statusCode: 200, headers: headers, body: JSON.generate(response) }
end