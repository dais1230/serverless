require 'json'
require 'logger'
require 'shopify_api'

def fetchProducts(event:, context:)
  # ロガーの設定
  logger = Logger.new($stdout)
  
  shop_url = "https://#{ENV['API_KEY']}:#{ENV['PASSWORD']}@#{ENV['SHOP_NAME']}.myshopify.com"
  ShopifyAPI::Base.site = shop_url
  ShopifyAPI::Base.api_version = '2020-04'
  
  page = 1
  count = ShopifyAPI::Product.count
  puts "Found #{count} products in Shopify"
  if count > 0
    product_details = []
    page += count.divmod(50).first
    while page > 0
      products = ShopifyAPI::Product.find(:all, params: {limit: 50})
      
      product_details += products.map {|p| {
        id: p.id,
        title: p.title,
        price: p.variants[0].price,
        images: p.images[0].src
      }}
      page -= 1
    end
  end
  puts "Processing #{product_details.length} products from Shopify..."
  
  #   # TODO implement
  headers = {
    # "Content-Type": 'application/json',
    # "Access-Control-Allow-Methods": "GET, POST",
    "Access-Control-Allow-Origin": "*"
  }
  
  # パラメータのバリデーション
  request_body = event['body']
  logger.info(request_body)
  
  { statusCode: 200, headers: headers, body: JSON.generate(product_details) }
end
