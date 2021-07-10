import type { Pie } from "./pie"

type TimestampInISO = string
type AmountInCents = number

export enum OrderStatus {
  initiated = "initiated",
  confirmedByStore = "confirmed_by_store",
  cancelledByStore = "cancelled_by_store",
  preparing = "preparing",
  waitingforDriver = "waiting_for_driver",
  outForDelivery = "out_for_delivery",
  delivered = "delivered",
}

type Order = {
  orderId: string
  storeId: string
  status: OrderStatus
  pies: Pie[]
  price: AmountInCents
  tipPaid: AmountInCents | null
}

type Address = {
  streetAddress: string
  city: string
  postalCode: string
  province: string
}

export type DeliveryOrder = Order & {
  deliveryAddress: Address
  dispatchEstimatedAt: TimestampInISO
  deliveryEstimatedAt: TimestampInISO
  deliveredAt: TimestampInISO | null
}

export type PickupOrder = Order & {
  readyAt: TimestampInISO
  pickedUpAt: TimestampInISO | null
}
