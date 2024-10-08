const loginSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      pattern: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$",
    },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

const signupSchema = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 3, maxLength: 20 },
    email: {
      type: "string",
      pattern: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$",
    },
    password: { type: "string", minLength: 6 },
    role: { type: "string", enum: ["admin", "user"] },
  },
  required: ["username", "email", "password"],
  additionalProperties: true,
};

export { loginSchema, signupSchema };
