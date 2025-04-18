// TODO -- sever

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import battleshipAPI from './backend/api/battleship.api.js';
import userAPI from './backend/api/user.api.js';
import dotenv from 'dotenv';

// Load .env variables
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));


// TODO -- add routes or remove?
// API routes
app.use('/api/user', userAPI);
app.use('/api/battleship', battleshipAPI);


// MongoDB connection
const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    console.error('MongoDB URI is not defined in the .env file');
    process.exit(1);  // Exit if the MongoDB URI is not available
}

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("MongoDB connected successfully.");
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
        process.exit(1);  // Exit the process on connection failure
    });

// Start the server
app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running...');
});
