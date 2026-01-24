const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const sendEmail = require('../email/email');

async function registerUser(req, res) {
  try {

    function generateOtp() {
      return Math.floor(100000 + Math.random() * 900000).toString();
    }
    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    const otp = generateOtp();
    const otpExpiry = Date.now() + 15 * 60 * 1000;

    const user = await userModel.create({ username, email, password, otp, otpExpiry, isverified: false });
    await sendEmail(
      email,
      "Verify your email",
      `Your OTP is ${otp}. It will expire in 15 minutes.`
    );

    return res.status(201).json({
      message: "OTP sent to your email. Please verify to continue.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Registration failed",
    });


  }
}

//   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
//   res.cookie('token', token);
//   res.status(201).json({ message: 'User registered successfully', user })
// }

async function loginUser(req, res) {
  const { email, password } = req.body;

  console.log("email",email);
  console.log("pass",password);

  const isUserExist = await userModel.findOne({ email });
  if (!isUserExist) {
    return res.status(404).json({ message: 'User not found' });
  }
  console.log(isUserExist.isverified);
  
  if (!isUserExist.isverified) {
  return res.status(403).json({
    message: "Please verify your email first",
  });
}

  if (isUserExist.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: isUserExist._id }, process.env.JWT_SECRET);
  res.cookie('token', token)
  res.status(200).json({ message: 'Login successful', user: isUserExist });

}

async function getUserDetails(req, res) {
  try {
    const token = req.cookies.token;
    


    if (!token) {
      return res.status(401).json({ message: "token hi nhi h" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const user = await userModel.findById(decoded.userId).select("-password");


    if (!user) {
      return res.status(401).json({ message: "is id ka user hi nhi h" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(401).json({ success: false });
  }
};

module.exports = { registerUser, loginUser, getUserDetails };