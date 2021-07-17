import { AWS } from "@serverless/typescript"

export const orderTable: AWS["resources"]["Resources"] = {
  OrderTable: {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      TableName: "${self:provider.environment.ORDER_TABLE_NAME}",
      BillingMode: "PAY_PER_REQUEST",
      AttributeDefinitions: [
        {
          AttributeName: "orderId",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "orderId",
          KeyType: "HASH",
        },
      ],
    },
  },
}
