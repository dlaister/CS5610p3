import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to validate user credentials during login
userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Function to register a new user
export const registerUser = async (username, password) => {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('Username already exists');
    }

    const user = new User({ username, password });
    await user.save();
};

// Function to validate user login
export const validateUser = async (username, password) => {
    const user = await User.findOne({ username });
    if (user && await user.isValidPassword(password)) {
        return user;
    }
    return null;  // Return null if user not found or password doesn't match
};

// Function to update user password
export const updateUserPassword = async (username, newPassword) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('User not found');
    }
    user.password = newPassword;
    await user.save();
};

// Function to get all users' data (including id, username, and password)
export const getAllUsers = async () => {
    try {
        // We select the '_id' (MongoDB id), 'username', and 'password' fields to return
        const users = await User.find({}, '_id username password');
        return users;
    } catch (error) {
        throw new Error('Error fetching users');
    }
};

// Function to delete a user
export const deleteUser = async (username) => {
    const user = await User.findOneAndDelete({ username });
    return user;  // Return the deleted user or null if not found
};

export default User;
