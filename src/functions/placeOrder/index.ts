import schema from "./schema"
import { resolveHandlerPath } from "@utils"

export default {
  handler: `${resolveHandlerPath(__dirname)}/handler.main`,
  iamRoleStatementsInherit: true,
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: ["dynamodb:GetItem"],
      Resource: [{ "Fn::GetAtt": ["StoreTable", "Arn"] }],
    },
    {
      Effect: "Allow",
      Action: ["dynamodb:PutItem"],
      Resource: [{ "Fn::GetAtt": ["OrderTable", "Arn"] }],
    },
  ],
  events: [
    {
      http: {
        method: "post",
        path: "place-order",
        request: {
          schema: {
            "application/json": schema,
          },
        },
      },
    },
  ],
}
