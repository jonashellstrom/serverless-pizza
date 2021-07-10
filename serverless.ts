import type { AWS } from "@serverless/typescript"

import helloWorld from "@functions/helloWorld"

const serverlessConfiguration: AWS = {
  service: "serverless-pizza",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack"],
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
    },
    lambdaHashingVersion: "20201221",
  },
  functions: { helloWorld },
}

module.exports = serverlessConfiguration
