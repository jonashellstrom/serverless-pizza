import { AWS } from "@serverless/typescript"

export const orderTopic: AWS["resources"]["Resources"] = {
  OrderTopic: {
    Type: "AWS::SNS::Topic",
    Properties: {
      TopicName: "OrderTopic",
    },
  },
}

const notifyStoreQueueOrderTopicSubscription: AWS["resources"]["Resources"] = {
  NotifyStoreQueueSubscription: {
    Type: "AWS::SNS::Subscription",
    Properties: {
      TopicArn: { Ref: "OrderTopic" },
      Protocol: "sqs",
      Endpoint: { "Fn::GetAtt": ["NotifyStoreQueue", "Arn"] },
      FilterPolicy: { event: ["order_placed"] },
    },
  },
}

export const orderTopicSubscriptions = {
  ...notifyStoreQueueOrderTopicSubscription,
}
