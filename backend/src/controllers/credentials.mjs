import jwt from "jsonwebtoken";
import { User } from "../mongoose/schemas/user.mjs";
import errorHandler from "../handlers/error.mjs";
import { comparePassword, encryptPassword } from "../utils/passwordHashing.mjs";
const Signup = async (request, response) => {
  try {
    const { username, email, password, role } = request.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(400).json({
        ok: false,
        message: "User Already Exists",
      });
    }

    const user = new User({
      username,
      email,
      password: await encryptPassword(password),
      cartData: [],
      role,
    });

    await user.save();

    return response.status(201).json({
      ok: true,
      message: "User Created",
    });
  } catch (error) {
    console.error(error, "Failed to Signup");
    errorHandler(error, request, response);
  }
};

const Login = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).json({
        ok: false,
        message: "User Not Found",
      });
    }
    const isValid = await comparePassword(password, user.password);
    if (isValid) {
      const token = jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      response.cookie(process.env.TOKEN, token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
      return response.status(200).send({
        ok: true,
        user: user,
        token: token,
        message: "Logged In",
      });
    } else {
      return response.status(401).json({
        ok: false,
        message: "Invalid Password",
      });
    }
  } catch (error) {
    console.error(error, "Failed to Login");
    errorHandler(error, request, response);
  }
};

const Logout = async (request, response) => {
  try {
    const { token } = request.cookies;
    if (token) {
      response.clearCookie(process.env.TOKEN);
    }

    response.status(200).send({
      ok: true,
      message: "Logged Out",
    });
  } catch (error) {
    console.error(error, "Failed to Logout");
    errorHandler(error, request, response);
  }
};

export { Signup, Login, Logout };
