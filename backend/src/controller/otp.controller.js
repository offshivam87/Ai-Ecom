const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isverified) {
      return res.status(400).json({
        message: "Email already verified",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    // ✅ OTP correct & valid
    user.isverified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token);

    return res.status(200).json({
      message: "Email verified & logged in",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isverified: user.isverified,
      },
    });
  } catch (error) {
    console.error(error);
   return res.status(500).json({
      message: "OTP verification failed",
    });
  }
}

module.exports = { verifyOtp };
