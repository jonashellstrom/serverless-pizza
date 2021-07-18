import "source-map-support/register"
import { Handler } from "aws-lambda"

import { formatJSONResponse } from "@utils"
import { orderDb, orderSerializer } from "@services"

const allowedOrderParties = ["customer", "store", "driver"]

const getOrder: Handler = async ({
  pathParameters: { orderId },
  queryStringParameters: { party },
}) => {
  if (!party || !allowedOrderParties.includes(party)) {
    return formatJSONResponse(
      {
        message:
          "Must specify a party 'customer', 'store' or 'driver' as a query string parameter.",
      },
      400
    )
  }
  console.info(`Looking up order [${orderId}].`)

  const order = await orderDb.getById(orderId)
  if (!order) {
    return formatJSONResponse(
      {
        message: `Order with id [${orderId}] does not exist.`,
      },
      404
    )
  }
  const serializedOrder = orderSerializer(party, order)

  return formatJSONResponse(
    {
      order: serializedOrder,
    },
    200
  )
}

export const main = getOrder
