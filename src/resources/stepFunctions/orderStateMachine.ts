export const orderStateMachine = {
  id: "OrderStateMachine",
  name: "order-state-machine-${self:provider.stage}",
  definition: {
    Comment: "Orchestrates the order and delivery of pizzas",
    StartAt: "NotifyStore",
    States: {
      NotifyStore: {
        Type: "Task",
        OutputPath: "$",
        Resource: "arn:aws:states:::sns:publish.waitForTaskToken",
        Parameters: {
          TopicArn: { Ref: "OrderTopic" },
          Message: {
            "Input.$": "$",
            "TaskToken.$": "$$.Task.Token",
          },
          MessageAttributes: {
            event: {
              DataType: "String",
              StringValue: "order_placed",
            },
          },
        },
        Catch: [
          {
            ErrorEquals: ["OrderDeclined"],
            Next: "MarkOrderAsDeclined",
          },
        ],
        Next: "MarkOrderAsAccepted",
      },
      MarkOrderAsAccepted: {
        Type: "Task",
        ResultPath: null,
        Resource: "arn:aws:states:::dynamodb:updateItem",
        Parameters: {
          TableName: { Ref: "OrderTable" },
          Key: {
            orderId: { "S.$": "$.orderId" },
          },
          UpdateExpression: "SET #status = :accepted_by_store",
          ExpressionAttributeNames: {
            "#status": "status",
          },
          ExpressionAttributeValues: {
            ":accepted_by_store": { S: "accepted_by_store" },
          },
        },
        Next: "NotifyDriver",
      },
      MarkOrderAsDeclined: {
        Type: "Task",
        ResultPath: null,
        Resource: "arn:aws:states:::dynamodb:updateItem",
        Parameters: {
          TableName: { Ref: "OrderTable" },
          Key: {
            orderId: { "S.$": "$.orderId" },
          },
          UpdateExpression: "SET #status = :declined_by_store",
          ExpressionAttributeNames: {
            "#status": "status",
          },
          ExpressionAttributeValues: {
            ":declined_by_store": { S: "declined_by_store" },
          },
        },
        Next: "CancelOrder",
      },
      NotifyDriver: {
        Type: "Task",
        OutputPath: "$",
        Resource: "arn:aws:states:::sns:publish",
        Parameters: {
          TopicArn: { Ref: "OrderTopic" },
          Message: {
            "Input.$": "$",
          },
          MessageAttributes: {
            event: {
              DataType: "String",
              StringValue: "order_started",
            },
          },
        },
        Next: "FinishOrder",
      },
      CancelOrder: {
        Type: "Succeed",
      },
      FinishOrder: {
        Type: "Succeed",
      },
    },
  },
}
