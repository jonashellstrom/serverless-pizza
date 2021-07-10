import "source-map-support/register"

import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONResponse,
  middyfy,
} from "@utils"

import schema from "./schema"

const helloWorld: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  return formatJSONResponse({
    message: `Hello World! It's nice to meet you ${event.body.name}.`,
  })
}

export const main = middyfy(helloWorld)
