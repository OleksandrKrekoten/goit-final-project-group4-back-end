const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        // eslint-disable-next-line no-useless-escape
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Email address is required"],
      minLength: 8,
    },
    balance: {
      type: String,
    //   required: [true, "Balance is required"],
    },
  },
  { versionKey: false, timestamps: true }
);
const User = mongoose.model("users", schema);
module.exports = {
  User,
};
