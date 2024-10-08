import { User } from "../mongoose/schemas/user.mjs";
import errorHandler from "../handlers/error.mjs";
const getUsers = async (request, response) => {
  try {
    const users = await User.find({});
    response.json({
      ok: true,
      users,
    });
  } catch (error) {
    console.error(error, "Failed to Get Users");
    errorHandler(error, request, response);
  }
};

export { getUsers };
