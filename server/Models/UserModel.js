const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Enter email"],
    unique: true,
    // validate: [validator.isEmail, "Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Enter password"],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "Admin"],
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
},{timestamps: true});


userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
userSchema.methods.checkPassword = async function (enteredPasswordForLogin) {
  return await bcrypt.compare(enteredPasswordForLogin, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = async function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordTokenExpire = Date.now() + 15 * 60 * 1000; 
  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

