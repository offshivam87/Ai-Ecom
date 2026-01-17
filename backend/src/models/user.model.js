const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['user', 'admin'], // सिर्फ ये दो ही वैल्यू हो सकती हैं
        default: 'user' // नया अकाउंट बनाने वाला डिफ़ॉल्ट रूप से 'user' होगा
    },
}, {
    timestamps: true,
});
 
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel; 