export default {
  required: ["orderId", "storeId", "accepted", "taskToken"],
  type: "object",
  properties: {
    orderId: { type: "string" },
    storeId: { type: "string" },
    accepted: { type: "boolean" },
    declinedReason: {
      type: "string",
      enum: ["no_capacity", "closing_time", "opening_time"],
    },
    taskToken: { type: "string" },
  },
} as const
