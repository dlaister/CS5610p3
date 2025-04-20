//TODO -- sever

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userAPI from './backend/api/user.api.js';
import scoresAPI from './backend/api/scores.api.js';
import allGamesAPI from './backend/api/allGames.api.js';
import path, {dirname} from 'path';

import dotenv from 'dotenv';

// Load .env variables
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));


// API routes
app.use('/api/user', userAPI);
app.use('/api/scores', scoresAPI);
app.use('/api/allGames', allGamesAPI);


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

const frontend_dir = path.join(path.resolve(), 'dist')

app.use(express.static(frontend_dir));
app.get('*', function (req, res) {
    res.sendFile(path.join(frontend_dir, "index.html"));
});


// Start the server
app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running...');
});
