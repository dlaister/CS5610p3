// TODO -- user api

import express from 'express';
import bcrypt from 'bcrypt'; // password hashing
import User from '../db/schedma/user.schema.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({success: false, message: "Missing username or password."});
    }

    try {
        const existingUser = await User.findOne({userName: username});

        if (existingUser) {
            return res.status(409).json({success: false, message: "Username already taken."});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName: username,
            password: hashedPassword
        });

        await newUser.save();

        res.cookie("username", username, {httpOnly: true});
        return res.status(201).json({success: true, message: "User registered successfully."});
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({success: false, message: "Server error during registration."});
    }
});


// Login
router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({success: false, message: "Missing username or password."});
    }

    const user = await User.findOne({userName: username});
    if (!user) {
        return res.status(404).json({success: false, message: "User not found."});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({success: false, message: "Invalid password."});
    }

    res.cookie("username", username, {httpOnly: true});
    return res.status(200).json({success: true, message: "Login successful."});
});


export default router;
