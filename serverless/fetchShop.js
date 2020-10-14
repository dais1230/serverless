// require 'json'
// require 'aws-sdk-dynamodb'

// def fetchShop(event:, context:)
//   dynamodb = Aws::DynamoDB::Client.new(region: 'ap-northeast-1')

//   params = {
//     table_name: 'Shop',
//     key: {
//       id: '1'
//     }
//   }

//   result = dynamodb.get_item(params)

//   headers = {
//     "Access-Control-Allow-Origin": "*"
//   }

//   { statusCode: 200, headers: headers, body: JSON.generate(result) }
// end
