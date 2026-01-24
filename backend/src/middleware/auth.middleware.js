const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel
      .findById(decoded.userId)
      .select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 🔥 middleware ka kaam yahin hota hai
    req.user = user;        // full user
    req.userId = user._id;  // convenience

    next(); // 🚀 request controller ko de do
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
