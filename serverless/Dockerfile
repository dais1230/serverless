# Node.js: 12.20.0
FROM node:12.20.0-buster
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY

RUN npm install -g aws-sdk
RUN npm install -g serverless
RUN npm install -g serverless-offline
RUN npm install -g serverless-dynamodb-local

# set aws key
RUN sls config credentials --provider aws --key $AWS_ACCESS_KEY_ID --secret $AWS_SECRET_ACCESS_KEY

CMD [ "sls", "offline", "--host", "0.0.0.0" ]
