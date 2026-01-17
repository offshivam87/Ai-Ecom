const express = require('express');
const { registerUser, loginUser } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login',loginUser)

module.exports = router;