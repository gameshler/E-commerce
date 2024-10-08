import errorHandler from "../handlers/error.mjs";
import jwt from "jsonwebtoken";
import { User } from "../mongoose/schemas/user.mjs";
const isAdmin = async (request, response, next) => {
  const token = request.cookies.token;
  if (!token) {
    return response.status(401).send("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user || decoded.role !== "admin") {
      return response.status(403).json({ ok: false, message: "Forbidden" });
    }
    request.user = decoded;
    response.status(200).json({ ok: true, message: "Admin Access Granted" });
    next();
  } catch (error) {
    console.error("Failed to Validate JWT", error);
    errorHandler(error, request, response);
  }
};

const isUser = async (request, response, next) => {
  const token = request.cookies.token;

  if (!token) {
    return response.status(401).send("Unauthorized");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return response.status(403).json({ ok: false, message: "Forbidden" });
    }

    if (decoded.role === "admin") {
      request.user = decoded;
      return response
        .status(200)
        .json({ ok: true, message: "Admin Access Granted" });
    }

    if (decoded.role === "user") {
      request.user = decoded;
      return response
        .status(200)
        .json({ ok: true, message: "User Access Granted" });
    }

    next();
  } catch (error) {
    console.error("Failed to Validate JWT", error);
    errorHandler(error, request, response);
  }
};

export { isAdmin, isUser };
