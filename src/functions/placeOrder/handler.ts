import "source-map-support/register"
import nanoid from "nanoid"

import {
  currentIsoTimeOffsetBySeconds,
  formatJSONResponse,
  middyfyWithValidatorSchema,
  ValidatedEventAPIGatewayProxyEvent,
} from "@utils"
import { DeliveryOrder, OrderStatus } from "@types"

import inputSchema from "./schema"
import {
  DirectionsService,
  orderDb,
  storeDb,
  StateMachineService,
} from "@services"

const orderStateMachine = new StateMachineService(
  process.env.ORDER_STATE_MACHINE_ARN
)

const placeOrder: ValidatedEventAPIGatewayProxyEvent<typeof inputSchema> =
  async ({ body: { storeId, paymentId, pies, deliveryAddress } }) => {
    console.info(
      `Order received for store id [${storeId}] for [${pies.length}] pizza(s).`
    )
    const store = await storeDb.getById(storeId)
    if (!store) {
      return formatJSONResponse(
        {
          message: `Store with id [${storeId}] does not exist.`,
        },
        404
      )
    }

    const directionService = new DirectionsService()
    const directions = await directionService.getDirections(
      store.coordinates,
      deliveryAddress.coordinates
    )

    const deliveryTimeInSeconds = directions.summary.duration
    const deliverySteps = directions.segments[0].steps

    const preparationTimeInSeconds = 900
    const totalTimeInSeconds = deliveryTimeInSeconds + preparationTimeInSeconds

    const orderId = nanoid()

    const order: DeliveryOrder = {
      orderId,
      storeId,
      status: OrderStatus.initiated,
      pies,
      deliveryAddress,
      deliverySteps,
      paymentId,
      tipPaid: null,
      createdAt: new Date().toISOString(),
      dispatchEstimatedAt: currentIsoTimeOffsetBySeconds(
        preparationTimeInSeconds
      ),
      deliveryEstimatedAt: currentIsoTimeOffsetBySeconds(totalTimeInSeconds),
      deliveredAt: null,
    }

    await orderDb.save(order)

    await orderStateMachine.start({
      name: orderId,
      input: { orderId: order.orderId, storeId: order.storeId },
    })

    return formatJSONResponse(
      {
        message: `Order of [${pies.length}] pizza(s) has been initiated!`,
        order,
      },
      201
    )
  }

export const main = middyfyWithValidatorSchema(placeOrder, inputSchema)
