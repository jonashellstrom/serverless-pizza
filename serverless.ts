import type { AWS } from "@serverless/typescript"

import helloWorld from "@functions/helloWorld"
import storeTable from "@resources/storeTable"
import orderTable from "@resources/orderTable"

const serverlessConfiguration: AWS = {
  service: "serverless-pizza",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: [
    "serverless-webpack",
    "serverless-export-env",
    "serverless-iam-roles-per-function",
  ],
  provider: {
    name: "aws",
    region: "ca-central-1",
    stage: "dev",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      STORE_TABLE_NAME: "store-table-${self:provider.stage}",
      ORDER_TABLE_NAME: "order-table-${self:provider.stage}",
    },
    lambdaHashingVersion: "20201221",
  },
  functions: { helloWorld },
  resources: {
    Resources: {
      ...storeTable,
      ...orderTable,
    },
  },
}

module.exports = serverlessConfiguration
