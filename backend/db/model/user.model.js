// TODO -- user.model
// TODO --encrypt here???

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserSchema from '../schema/user.schema.js';

const User = mongoose.model("User", UserSchema);

// Register a new user
export async function registerUser(userName, plainPassword) {
    const existingUser = await User.findOne({userName});
    if (existingUser) {
        throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const newUser = new User({userName, password: hashedPassword});
    return await newUser.save();
}

// Find a user by username
export async function findUserByUsername(userName) {
    return await User.findOne({userName});
}

// Validate user login
export async function validateUser(userName, plainPassword) {
    const user = await User.findOne({userName});
    if (!user) return null;

    const isMatch = await bcrypt.compare(plainPassword, user.password);
    return isMatch ? user : null;
}

// Update user password
export async function updateUserPassword(userName, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await User.findOneAndUpdate(
        {userName},
        {password: hashedPassword},
        {new: true}
    );
}

// Delete a user
export async function deleteUser(userName) {
    return await User.findOneAndDelete({userName});
}
