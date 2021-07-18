import schema from "./schema"
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
    {
      Effect: "Allow",
      Action: ["states:SendTaskSuccess"],
      Resource: [{ Ref: "OrderStateMachine" }],
    },
  ],
  events: [
    {
      http: {
        method: "post",
        path: "order/pickup",
        request: {
          schema: {
            "application/json": schema,
          },
        },
      },
    },
  ],
}
