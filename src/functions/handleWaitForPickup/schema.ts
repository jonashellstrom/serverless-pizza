export default {
  required: ["orderId", "taskToken"],
  type: "object",
  properties: {
    orderId: { type: "string" },
    taskToken: { type: "string" },
  },
} as const
