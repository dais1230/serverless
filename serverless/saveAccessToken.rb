require 'json'
require 'aws-sdk-dynamodb'

def saveAccessToken(event:, context:)
  dynamodb = Aws::DynamoDB::Client.new(region: 'ap-northeast-1')

  item = {
    id: '1',
    name: 'fr-rd',
    accessToken: 'wsnfli434r9rf094u53'
  }

  params = {
    table_name: 'Shop',
    item: item
  }

  dynamodb.put_item(params)
end