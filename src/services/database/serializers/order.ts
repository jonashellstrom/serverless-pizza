import { OrderModel } from "../models/order"

type OrderParty = "customer" | "store" | "driver"

const orderSerializer = (
  party: OrderParty,
  order: OrderModel
): Partial<OrderModel> => {
  switch (party) {
    case "customer":
      return {
        status: order.status,
        storeId: order.storeId,
        pies: order.pies,
        deliveryAddress: order.deliveryAddress,
        deliveryEstimatedAt: order.deliveryEstimatedAt,
        createdAt: order.createdAt,
      }
    case "store":
      return {
        status: order.status,
        storeId: order.storeId,
        pies: order.pies,
        dispatchEstimatedAt: order.dispatchEstimatedAt,
        createdAt: order.createdAt,
      }
    case "driver":
      return {
        status: order.status,
        storeId: order.storeId,
        deliveryAddress: order.deliveryAddress,
        deliverySteps: order.deliverySteps,
        dispatchEstimatedAt: order.dispatchEstimatedAt,
        deliveryEstimatedAt: order.deliveryEstimatedAt,
        createdAt: order.createdAt,
      }
    default:
      break
  }
}

export default orderSerializer
