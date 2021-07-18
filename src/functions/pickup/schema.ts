export default {
  required: ["orderId"],
  type: "object",
  properties: {
    orderId: { type: "string" },
  },
} as const
