import type { AWS } from "@serverless/typescript"

import placeOrder from "@functions/placeOrder"
import orderDecision from "@functions/orderDecision"
import handleWaitForPickup from "@functions/handleWaitForPickup"
import pickup from "@functions/pickup"
import getOrder from "@functions/getOrder"
import {
  orderTable,
  storeTable,
  notifyStoreQueue,
  notifyDriverQueue,
  orderTopic,
  orderStateMachine,
  orderTopicSubscriptions,
} from "@resources"

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
    "serverless-step-functions",
    "serverless-dotenv-plugin",
  ],
  useDotenv: true,
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
      KMS_KEY_ID: "${env:KMS_KEY_ID}",
      STORE_TABLE_NAME: "store-table-${self:provider.stage}",
      ORDER_TABLE_NAME: "order-table-${self:provider.stage}",
      ORDER_STATE_MACHINE_ARN:
        "${self:resources.Outputs.OrderStateMachineARN.Value}",
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
  functions: {
    placeOrder,
    orderDecision,
    handleWaitForPickup,
    pickup,
    getOrder,
  },
  // @ts-ignore
  stepFunctions: {
    stateMachines: { orderStateMachine },
  },
  resources: {
    Resources: {
      ...storeTable,
      ...orderTable,
      ...notifyStoreQueue,
      ...notifyDriverQueue,
      ...orderTopic,
      ...orderTopicSubscriptions,
    },
    Outputs: {
      OrderStateMachineARN: {
        Description: "The ARN of the order state machine",
        Value: { Ref: "OrderStateMachine" },
      },
    },
  },
}

module.exports = serverlessConfiguration
