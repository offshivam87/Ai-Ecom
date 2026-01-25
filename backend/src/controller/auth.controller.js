const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const sendEmail = require('../email/email');

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;
    console.log("REGISTER API HIT", req.body);



    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 15 * 60 * 1000;



    await userModel.create({
      username,
      email,
      password,
      otp,
      otpExpiry,
      isverified: false,
    });

    // 🔥 email isolated
    try {
      const htmlTemplate = `
<div style="font-family: Arial, sans-serif; line-height: 1.6;">
  <h2>Email Verification</h2>
  <p>Hello,</p>

  <p>Thank you for registering with <strong>DLeap Kart</strong>.</p>

  <p>Your One-Time Password (OTP) is:</p>

  <h1 style="letter-spacing: 2px;">${otp}</h1>

  <p>
    This OTP is valid for <strong>15 minutes</strong>.  
    Please do not share this code with anyone.
  </p>

  <p>
    If you did not request this verification, you can safely ignore this email.
  </p>

  <p>
    Regards,<br/>
    <strong>DLeap Kart Team</strong>
  </p>
</div>
`;






      await sendEmail({
      to: email,
      subject: "Verify Your Email Address",
      html: htmlTemplate,
    });
      console.log("After sendMail");
    } catch (e) {
      console.error("Email failed:", e);
    }

    return res.status(201).json({
      message: "OTP sent to your email. Please verify to continue.",
    });
  } catch (error) {
    console.error(error);
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

  console.log("email", email);
  console.log("pass", password);

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