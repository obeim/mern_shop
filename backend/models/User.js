import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
const { isEmail } = validator;
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minlength: [6, "password must not be less than 6 letters"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail, "enter a valid email"],
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});
const User = mongoose.model("users", userSchema);

export default User;
