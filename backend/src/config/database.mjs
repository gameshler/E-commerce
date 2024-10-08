import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URI = process.env.MONGO_URI;

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(URI, {
      dbName: "E-commerce",
    });

    return connection;
  } catch (error) {
    console.error(error, "Failed to connect to MongoDB");
    throw error;
  }
};
const connection = dbConnect();
export default connection;
