import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
  },
  email: {
    type: mongoose.Schema.Types.String,
    unique: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
  },
  cartData: {
    type: mongoose.Schema.Types.Array,
  },
  role: { type: String, default: "user" },
  date: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", UserSchema);
