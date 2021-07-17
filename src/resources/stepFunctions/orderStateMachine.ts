export const orderStateMachine = {
  id: "OrderStateMachine",
  name: "order-state-machine-${self:provider.stage}",
  definition: {
    Comment: "Orchestrates the order and delivery of pizzas",
    StartAt: "NotifyStore",
    States: {
      NotifyStore: {
        Type: "Task",
        Resource: "arn:aws:states:::sns:publish.waitForTaskToken",
        Parameters: {
          TopicArn: { Ref: "NotifyStoreTopic" },
          Message: {
            "Input.$": "$",
            "TaskToken.$": "$$.Task.Token",
          },
        },
        Catch: [
          {
            ErrorEquals: ["OrderDeclined"],
            Next: "CancelOrder",
          },
        ],
        Next: "StartOrder",
      },
      StartOrder: {
        Type: "Succeed",
      },
      CancelOrder: {
        Type: "Succeed",
      },
    },
  },
}
