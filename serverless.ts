import type { AWS } from "@serverless/typescript"

import placeOrder from "@functions/placeOrder"
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
      REGION: "${self:provider.region}",
      KMS_KEY_ID: "REPLACE_ME",
      STORE_TABLE_NAME: "store-table-${self:provider.stage}",
      ORDER_TABLE_NAME: "order-table-${self:provider.stage}",
      OPENROUTE_URL: "https://api.openrouteservice.org/v2/",
      OPENROUTE_API_KEY_SSM_NAME:
        "/${self:service}-${self:provider.stage}/openrouteservice-api-key",
    },
    lambdaHashingVersion: "20201221",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["ssm:GetParameter"],
        Resource: [
          {
            "Fn::Join": [
              ":",
              [
                "arn:aws:ssm:${self:provider.region}",
                { Ref: "AWS::AccountId" },
                "parameter/${self:service}-${self:provider.stage}/*",
              ],
            ],
          },
        ],
      },
      {
        Effect: "Allow",
        Action: ["kms:Decrypt", "kms:DescribeKey"],
        Resource: {
          "Fn::Join": [
            ":",
            [
              "arn:aws:kms",
              { Ref: "AWS::Region" },
              { Ref: "AWS::AccountId" },
              "key/${self:provider.environment.KMS_KEY_ID}",
            ],
          ],
        },
      },
    ],
  },
  functions: { placeOrder },
  resources: {
    Resources: {
      ...storeTable,
      ...orderTable,
    },
  },
}

module.exports = serverlessConfiguration
