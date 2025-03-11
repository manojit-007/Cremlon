const CatchAsyncError = require("../Middleware/CatchAsyncError");
const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const SendEmail = require("../Utils/SendEmail");

const registerUser = CatchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      error: "User already exists",
    });
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: encryptedPassword,
  });
  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
  res.status(201).json({
    success: true,
    message : "User created successfully",
    token,
  });
});

const loginUser = CatchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
  res.json({ success: true, message: "Login successful", token });
});

const isAdmin = CatchAsyncError(async (req, res, next) => {
  if (req.role !== "Admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  const user = await User.findOne({ email: req.email });
  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
  return res.status(200).json({ message: "Access granted", token });
});

const forgotPassword = CatchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false,
    });
  }
  const resetToken = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.ORIGIN}/admin/password/reset/${resetToken}`;

  const message = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="text-align: center; color: #4CAF50;">Password Recovery</h2>
      <p>Hello <strong>${user.username}</strong>,</p>
      <p>We received a request to reset your password. Click the button below to reset it:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a 
          href="${resetPasswordUrl}" 
          style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">
          Reset Password
        </a>
      </div>
      <p>If the button above doesn’t work, copy and paste the following link into your browser:</p>
      <p style="word-wrap: break-word; color: #0066cc;">${resetPasswordUrl}</p>
      <p>If you did not request this password reset, please ignore this email or contact our support if you have concerns.</p>
      <p>Best regards,<br>SmartBuy Team</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <footer style="text-align: center; font-size: 12px; color: #777;">
        <p>&copy; ${new Date().getFullYear()} SmartBuy. All rights reserved.</p>
      </footer>
    </div>
  `;

  try {
    await SendEmail({
      email: user.email,
      subject: `Password Recovery`,
      message,
      isHtml: true,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(error);
  }
});

const resetPassword = CatchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordTokenExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save();
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Password reset successfully",
      success: true,
      token
    });
  } catch (error) {
    // console.log(error);
    res.status(404).json({
      message: "Invalid token or token expired",
      success: false,
    });
  }
});
const logOut = CatchAsyncError(async(req,res,next) =>{
  res.clearCookie("token");
  res.json({
    message: "Logged out successfully",
    success: true,
  });
})

module.exports = {
  registerUser,
  loginUser,
  isAdmin,
  forgotPassword,
  resetPassword,
  logOut,
};
