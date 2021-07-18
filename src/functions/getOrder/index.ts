import { resolveHandlerPath } from "@utils"

export default {
  handler: `${resolveHandlerPath(__dirname)}/handler.main`,
  iamRoleStatementsInherit: true,
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: ["dynamodb:GetItem"],
      Resource: [{ "Fn::GetAtt": ["OrderTable", "Arn"] }],
    },
  ],
  events: [
    {
      http: {
        method: "get",
        path: "order/{orderId}",
        parameters: {
          querystrings: {
            party: true,
          },
        },
      },
    },
  ],
}
