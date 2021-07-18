import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import validator from "@middy/validator"
import httpErrorHandler from "@middy/http-error-handler"
import { Handler } from "aws-lambda/handler"

export const middyfy = (handler: Handler) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(
      httpErrorHandler({
        fallbackMessage: "Sorry, there was an issue processing the request.",
      })
    )
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
