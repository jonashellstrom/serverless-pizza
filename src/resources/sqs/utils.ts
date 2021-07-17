import { AWS } from "@serverless/typescript"

export const getOrderTopicQueueDefinition = (
  actionName: string
): AWS["resources"]["Resources"] => {
  const pascalCasedActionName = `${actionName[0].toUpperCase()}${actionName.substring(
    1
  )}`
  const logicalId = `${pascalCasedActionName}Queue`
  const dlqLogicalId = `${pascalCasedActionName}DLQueue`

  return {
    [logicalId]: {
      Type: "AWS::SQS::Queue",
      Properties: {
        QueueName: logicalId,
        RedrivePolicy: {
          deadLetterTargetArn: { "Fn::GetAtt": [dlqLogicalId, "Arn"] },
          maxReceiveCount: 5,
        },
      },
    },
    [dlqLogicalId]: {
      Type: "AWS::SQS::Queue",
      Properties: {
        QueueName: dlqLogicalId,
      },
    },
    [`${pascalCasedActionName}SNSToSQSPolicy`]: {
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
              Resource: { "Fn::GetAtt": [logicalId, "Arn"] },
              Action: "sqs:SendMessage",
              Condition: {
                ArnEquals: {
                  "aws:SourceArn": { Ref: "OrderTopic" },
                },
              },
            },
          ],
        },
        Queues: [{ Ref: logicalId }],
      },
    },
  }
}
