# sandbox-spa
## Docker イメージのビルド
$ docker-compose build --no-cache
## Docker の起動
$ docker-compose up -d serverless
## Serverless Framework の環境へログインする
$ docker-compose exec serverless /bin/bash
