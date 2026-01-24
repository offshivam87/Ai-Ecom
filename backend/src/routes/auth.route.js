const express = require('express');
const { registerUser, loginUser, getUserDetails } = require('../controller/auth.controller');
const { verifyOtp } = require('../controller/otp.controller');


const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp);
router.post('/login',loginUser)
router.get('/getUserDetails', getUserDetails);

module.exports = router;