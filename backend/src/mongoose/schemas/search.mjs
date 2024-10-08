const searchSchema = {
  type: "object",
  properties: {
    q: {
      type: "string",
      minLength: 1,
      maxLength: 40,
      description: "Search term for product names",
    },
  },
  required: ["q"],
  additionalProperties: false,
};

export { searchSchema };