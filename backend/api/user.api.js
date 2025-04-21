// TODO -- user.api

import express from 'express';
import {
    registerUser,
    validateUser,
    updateUserPassword,
    getAllUsers,
    deleteUser
} from '../db/model/user.model.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try {
        await registerUser(username, password);
        res.cookie("username", username, { httpOnly: true });
        res.status(200).json({success: true, message: "User registered successfully"});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
});

// Login
router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await validateUser(username, password);
        if (!user) {
            return res.status(401).json({success: false, message: "Invalid login"});
        }
        res.cookie("username", username, { httpOnly: true });
        res.status(200).json({success: true, message: "Logged in"});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
});

// Logout
router.post('/logout', (req, res) => {
    res.clearCookie("username");
    res.status(200).json({success: true, message: "Logged out successfully"});
});

// Update password
router.put('/update-password', async (req, res) => {
    const owner = req.cookies.username;
    const {newPassword} = req.body;

    if (!owner || !newPassword) {
        return res.status(400).json({success: false, message: "Missing user or new password"});
    }

    try {
        const updated = await updateUserPassword(owner, newPassword);
        if (!updated) {
            return res.status(404).json({success: false, message: "User not found"});
        }
        res.status(200).json({success: true, message: "Password updated"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
});

// Get all users
router.get('/all', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete user
router.delete('/delete', async (req, res) => {
    const owner = req.cookies.username;

    if (!owner) {
        return res.status(400).json({success: false, message: "User not logged in"});
    }

    try {
        const deleted = await deleteUser(owner);
        if (!deleted) {
            return res.status(404).json({success: false, message: "User not found"});
        }
        res.clearCookie("username");
        res.status(200).json({success: true, message: "User deleted"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
});

export default router;
