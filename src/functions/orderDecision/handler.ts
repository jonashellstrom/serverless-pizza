import "source-map-support/register"

import {
  formatJSONResponse,
  middyfyWithValidatorSchema,
  ValidatedEventAPIGatewayProxyEvent,
} from "@utils"
import { StateMachineService } from "@services"

import inputSchema from "./schema"

const orderStateMachine = new StateMachineService(
  process.env.ORDER_STATE_MACHINE_ARN
)

const orderDecision: ValidatedEventAPIGatewayProxyEvent<typeof inputSchema> =
  async ({
    body: { orderId, storeId, accepted, declinedReason, taskToken },
  }) => {
    console.info(
      `Store [${storeId}] made decision to ${
        accepted ? "accept" : "decline"
      } order [${orderId}].`
    )

    try {
      if (accepted) {
        await orderStateMachine.sendTaskSuccess({
          taskToken,
          output: { orderId, storeId },
        })
      } else {
        console.info(`Order declined reason: ${declinedReason}`)
        await orderStateMachine.sendTaskFailure({
          taskToken,
          error: "OrderDeclined",
        })
      }
    } catch (error) {
      console.error(
        `Error sending task token back to order state machine. Error: ${error}`
      )
      return formatJSONResponse(
        {
          message: `Decision for order [${orderId}] was not received.`,
        },
        500
      )
    }

    return formatJSONResponse(
      {
        message: `Decision to ${
          accepted ? "accept" : "decline"
        } order [${orderId}] has been received.`,
      },
      200
    )
  }

export const main = middyfyWithValidatorSchema(orderDecision, inputSchema)
