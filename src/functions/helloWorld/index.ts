import schema from "./schema"
import { resolveHandlerPath } from "@utils"

export default {
  handler: `${resolveHandlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "hello-world",
        request: {
          schema: {
            "application/json": schema,
          },
        },
      },
    },
  ],
}
