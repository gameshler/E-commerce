const cartSchema = {
  type: "object",
  properties: {
    productId: { type: "string" },
    userId: { type: "string", nullable: true },
  },
  required: ["productId"],
  additionalProperties: false,
};

export { cartSchema };
