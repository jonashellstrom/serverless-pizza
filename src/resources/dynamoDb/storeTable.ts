import { AWS } from "@serverless/typescript"

export const storeTable: AWS["resources"]["Resources"] = {
  StoreTable: {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      TableName: "${self:provider.environment.STORE_TABLE_NAME}",
      BillingMode: "PAY_PER_REQUEST",
      AttributeDefinitions: [
        {
          AttributeName: "storeId",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "storeId",
          KeyType: "HASH",
        },
      ],
    },
  },
}
