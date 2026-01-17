const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.create({ username, email, password })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token);
    res.status(201).json({ message: 'User registered successfully' ,user})
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    
    const isUserExist = await userModel.findOne({ email});
    if(!isUserExist){
        return res.status(404).json({ message: 'User not found' });
    }
    if(isUserExist.password !== password){
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: isUserExist._id }, process.env.JWT_SECRET);
    res.cookie('token', token)
    res.status(200).json({ message: 'Login successful' ,user:isUserExist});

}


module.exports = { registerUser, loginUser };