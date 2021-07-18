import "source-map-support/register"

import {
  formatJSONResponse,
  middyfyWithValidatorSchema,
  ValidatedEventAPIGatewayProxyEvent,
} from "@utils"
import { orderDb } from "@services"

import inputSchema from "./schema"

const handleWaitForPickup: ValidatedEventAPIGatewayProxyEvent<
  typeof inputSchema
> = async ({ body: { orderId, taskToken } }) => {
  console.info(`Order [${orderId}] will wait for pickup callback.`)

  await orderDb.addPickupTaskToken(orderId, taskToken)

  return formatJSONResponse(
    {
      message: `Order [${orderId}] has been updated with callback task token.`,
    },
    200
  )
}

export const main = middyfyWithValidatorSchema(handleWaitForPickup, inputSchema)
