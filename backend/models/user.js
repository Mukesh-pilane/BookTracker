const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: false,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "user",
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const user = this;
  if (user._update.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      user._update.password = await bcrypt.hash(user._update.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
