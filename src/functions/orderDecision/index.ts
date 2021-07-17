import schema from "./schema"
import { resolveHandlerPath } from "@utils"

export default {
  handler: `${resolveHandlerPath(__dirname)}/handler.main`,
  iamRoleStatementsInherit: true,
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: ["states:SendTaskSuccess", "states:SendTaskFailure"],
      Resource: [{ Ref: "OrderStateMachine" }],
    },
  ],
  events: [
    {
      http: {
        method: "post",
        path: "order/decision",
        request: {
          schema: {
            "application/json": schema,
          },
        },
      },
    },
  ],
}
