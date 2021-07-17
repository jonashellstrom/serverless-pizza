import { AWS } from "@serverless/typescript"

export const notifyStoreTopic: AWS["resources"]["Resources"] = {
  NotifyStoreTopic: {
    Type: "AWS::SNS::Topic",
    Properties: {
      TopicName: "NotifyStoreTopic",
      Subscription: [
        {
          Protocol: "sqs",
          Endpoint: { "Fn::GetAtt": ["NotifyStoreQueue", "Arn"] },
        },
      ],
    },
  },
}
