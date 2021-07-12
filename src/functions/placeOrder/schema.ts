export default {
  required: ["storeId", "paymentId", "pies", "deliveryAddress"],
  type: "object",
  properties: {
    storeId: { type: "string" },
    paymentId: { type: "string" },
    pies: {
      type: "array",
      items: {
        type: "object",
        required: ["size", "cheese", "toppings"],
        properties: {
          size: { type: "string", enum: ["small", "medium", "large"] },
          cheese: { type: "string", enum: ["small", "medium", "large"] },
          toppings: {
            type: "array",
            items: {
              type: "string",
              enum: [
                "pepperoni",
                "ham",
                "italianSausage",
                "bbqChicken",
                "bacon",
                "greenPepper",
                "mushroom",
                "onion",
                "olive",
              ],
            },
          },
        },
      },
    },
    deliveryAddress: {
      type: "object",
      required: [
        "coordinates",
        "streetAddress",
        "city",
        "postalCode",
        "province",
      ],
      properties: {
        coordinates: {
          type: "object",
          required: ["latitude", "longitude"],
          properties: {
            latitude: { type: "number" },
            longitude: { type: "number" },
          },
        },
        streetAddress: {
          type: "string",
          pattern: "^[a-zA-Z0-9-_. ]*$",
        },
        city: {
          type: "string",
          pattern: "^[a-zA-Z ]*$",
        },
        postalCode: {
          type: "string",
          pattern: "^([ABCEGHJKLMNPRSTVXY][0-9][A-Z] [0-9][A-Z][0-9])*$",
        },
        province: {
          type: "string",
          pattern: "^(?:AB|BC|MB|N[BLTSU]|ON|PE|QC|SK|YT)*$",
        },
      },
    },
  },
} as const
