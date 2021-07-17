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
            Next: "CancelOrder",
          },
        ],
        Next: "MarkOrderAsConfirmed",
      },
      MarkOrderAsConfirmed: {
        Type: "Task",
        ResultPath: null,
        Resource: "arn:aws:states:::dynamodb:updateItem",
        Parameters: {
          TableName: { Ref: "OrderTable" },
          Key: {
            orderId: { "S.$": "$.orderId" },
          },
          UpdateExpression: "SET #status = :confirmed_by_store",
          ExpressionAttributeNames: {
            "#status": "status",
          },
          ExpressionAttributeValues: {
            ":confirmed_by_store": { S: "confirmed_by_store" },
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
