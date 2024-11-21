import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      requird: true,
    },
    password: {
      type: String,
      requird: true,
    },
    email: {
      type: String,
      requird: true,
    },
    phone: {
      type: Number,
      requird: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema); // Correct model registration
export { User };
