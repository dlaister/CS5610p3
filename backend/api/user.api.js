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
    const { username, password } = req.body;
    try {
        await registerUser(username, password);
        res.cookie("user", username); // Simple cookie for user
        res.status(200).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await validateUser(username, password);
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid login" });
        }
        res.cookie("user", username); // Simple cookie for user
        res.status(200).json({ success: true, message: "Logged in" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Logout
router.post('/logout', (req, res) => {
    res.clearCookie("user"); // Clear the simple cookie for user
    res.status(200).json({ success: true, message: "Logged out successfully" });
});

// Check if user is active
router.get('/active', (req, res) => {
    const username = req.cookies.user;
    if (username) {
        res.status(200).json({ loggedIn: true, username });
    } else {
        res.status(200).json({ loggedIn: false });
    }
});

// Update password
router.put('/update-password', async (req, res) => {
    const owner = req.cookies.user;
    const { newPassword } = req.body;

    if (!owner || !newPassword) {
        return res.status(400).json({ success: false, message: "Missing user or new password" });
    }

    try {
        const updated = await updateUserPassword(owner, newPassword);
        if (!updated) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "Password updated" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
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
router.delete('/delete/:username', async (req, res) => {
    const { username } = req.params;  // Extract the username from the URL parameter

    if (!username) {
        return res.status(400).json({ success: false, message: "Username is required" });
    }

    try {
        const deleted = await deleteUser(username);  // Pass the username to your deleteUser function
        if (!deleted) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: `User ${username} deleted` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


export default router;
