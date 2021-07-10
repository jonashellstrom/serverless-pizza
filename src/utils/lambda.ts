import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import { Handler } from "aws-lambda/handler"

export const middyfy = (handler: Handler) => {
  return middy(handler).use(middyJsonBodyParser())
}
