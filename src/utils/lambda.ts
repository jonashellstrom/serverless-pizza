import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import { Handler } from "aws-lambda/handler"
import validator from "@middy/validator"

export const middyfy = (handler: Handler) => {
  return middy(handler).use(middyJsonBodyParser())
}

export const middyfyWithValidatorSchema = (
  handler: Handler,
  schema: { [key: string]: unknown }
) => {
  return middyfy(handler).use(
    validator({
      inputSchema: {
        type: "object",
        required: ["body"],
        properties: {
          body: {
            ...schema,
          },
        },
      },
    })
  )
}
