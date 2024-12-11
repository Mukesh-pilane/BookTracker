const mongoose = require("mongoose");
const { Schema } = mongoose;

const userTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "user_token",
  }
);

const UserToken = mongoose.model("userToken", userTokenSchema);

module.exports = UserToken;
