import "source-map-support/register"

import {
  formatJSONResponse,
  middyfyWithValidatorSchema,
  ValidatedEventAPIGatewayProxyEvent,
} from "@utils"
import { orderDb, StateMachineService } from "@services"

import inputSchema from "./schema"

const orderStateMachine = new StateMachineService(
  process.env.ORDER_STATE_MACHINE_ARN
)

const pickup: ValidatedEventAPIGatewayProxyEvent<typeof inputSchema> = async ({
  body: { orderId },
}) => {
  console.info(
    `Order [${orderId}] has been picked up. Getting state machine pickup task token.`
  )

  const { pickUpTaskToken, storeId, deliverySteps } = await orderDb.getById(
    orderId
  )

  await orderStateMachine.sendTaskSuccess({
    taskToken: pickUpTaskToken,
    output: { orderId, storeId },
  })
  console.info(
    `Called back to state machine to complete pickup for order [${orderId}].`
  )

  return formatJSONResponse(
    {
      message: `Pickup has been recorded for order [${orderId}].`,
      deliverySteps,
    },
    200
  )
}

export const main = middyfyWithValidatorSchema(pickup, inputSchema)
