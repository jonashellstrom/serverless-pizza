import type { Coordinates, Pie, Step } from "@types"

type Nanoid = string
type TimestampInISO = string
type AmountInCents = number

export enum OrderStatus {
  initiated = "initiated",
  confirmedByStore = "confirmed_by_store",
  declinedByStore = "declined_by_store",
  preparing = "preparing",
  waitingforDriver = "waiting_for_driver",
  outForDelivery = "out_for_delivery",
  delivered = "delivered",
}

type Order = {
  orderId: Nanoid
  storeId: Nanoid
  paymentId: Nanoid
  status: OrderStatus
  pies: Pie[]
  tipPaid: AmountInCents | null
  createdAt: TimestampInISO
}

type Address = {
  coordinates: Coordinates
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
  deliverySteps: Step[]
}

export type PickupOrder = Order & {
  readyAt: TimestampInISO
  pickedUpAt: TimestampInISO | null
}
