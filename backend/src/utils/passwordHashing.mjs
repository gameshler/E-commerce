import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error(error, "Failed to Encrypt Password");
    throw error;
  }
};

const comparePassword = async (password, hash) => {
  try {
    const res = await bcrypt.compare(password, hash);
    return res;
  } catch (error) {
    console.error(error, "Failed to Compare Password");
    throw error;
  }
};

export { encryptPassword, comparePassword };
