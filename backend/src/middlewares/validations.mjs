import jwt from "jsonwebtoken";
import Ajv from "ajv";
import dotenv from "dotenv";
dotenv.config();
const ajv = new Ajv();

const validateJwt = async (request, response, next) => {
  try {
    const { token } = request.cookies;
    if (!token) {
      request.body.userId = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.body.userId = decoded._id;
    request.role = decoded.role;
    next();
  } catch (error) {
    console.error(error, "Failed to Validate JWT");
    response.status(401).send("Invalid Token");
  }
};

const validateBody = (schema) => {
  return async (request, response, next) => {
    const valid = ajv.validate(schema, request.body);
    if (!valid) {
      return response.status(400).send(ajv.errors);
    }

    next();
  };
};

const validateQuery = (schema) => {
  return async (request, response, next) => {
    const valid = ajv.validate(schema, request.query);
    if (!valid) {
      return response.status(400).send(ajv.errors);
    }

    next();
  };
};

export { validateJwt, validateBody, validateQuery };
