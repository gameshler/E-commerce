import express from "express";
import connection from "./config/database.mjs";
import MongoStore from "connect-mongo";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import session from "express-session";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      mongoOptions: {
        dbName: "E-commerce",
      },
    }),
  })
);

app.use("/api/v1", routes);

const init = async () => {
  try {
    if (connection) {
      console.log("Database connected");
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    }
  } catch (error) {
    console.error(error);
  }
};

init();
