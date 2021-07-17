import { AWS } from "@serverless/typescript"

export const notifyStoreQueue: AWS["resources"]["Resources"] = {
  NotifyStoreQueue: {
    Type: "AWS::SQS::Queue",
    Properties: {
      QueueName: "NotifyStoreQueue",
      RedrivePolicy: {
        deadLetterTargetArn: { "Fn::GetAtt": ["NotifyStoreDLQueue", "Arn"] },
        maxReceiveCount: 5,
      },
    },
  },
  NotifyStoreDLQueue: {
    Type: "AWS::SQS::Queue",
    Properties: {
      QueueName: "NotifyStoreDLQueue",
    },
  },
  NotifyStoreSNSToSQSPolicy: {
    Type: "AWS::SQS::QueuePolicy",
    Properties: {
      PolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Sid: "Allow SNS to publish to SQS",
            Effect: "Allow",
            Principal: {
              Service: "sns.amazonaws.com",
            },
            Resource: { "Fn::GetAtt": ["NotifyStoreQueue", "Arn"] },
            Action: "sqs:SendMessage",
            Condition: {
              ArnEquals: {
                "aws:SourceArn": { Ref: "OrderTopic" },
              },
            },
          },
        ],
      },
      Queues: [{ Ref: "NotifyStoreQueue" }],
    },
  },
}
