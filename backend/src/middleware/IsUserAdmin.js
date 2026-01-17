const jwt = require('jsonwebtoken'); // 1. इंपोर्ट करना ज़रूरी है
const userModel = require('../models/user.model'); // 2. यूजर मॉडल भी चाहिए

async function isUserAdmin(req, res, next) {
    try {
        const token = req.cookies.token;

        // 1. टोकन चेक करें
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // 2. टोकन वेरीफाई करें
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. डेटाबेस से यूजर ढूँढें (क्योंकि Role वहीं रखा है)
        // ध्यान दें: पिछले कोड में हमने 'userId' नाम यूज़ किया था
        const user = await userModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // 4. रोल चेक करें
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin resource only.' });
        }

        // 5. यूजर को req में सेव करें (ताकि अगले फंक्शन में काम आए)
        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token', error: error.message });
    }
}

module.exports = isUserAdmin;