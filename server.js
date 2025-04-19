//TODO -- sever

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userAPI from './backend/api/user.api.js';
import scoresAPI from './backend/api/scores.api.js';
import allGamesAPI from './backend/api/allGames.api.js';

import dotenv from 'dotenv';

// Load .env variables
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));


// TODO -- add routes/remove
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

// Start the server
app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running...');
});


// ORIGINAL MODEL FROM POKEMON APP
// import express from 'express';
// import mongoose from 'mongoose';
// import battleshipAPI from './backend/api/battleship.api.js';
// import userAPI from './backend/api/user.api.js';
// import cookieParser from 'cookie-parser';
// import path, {dirname} from 'path';
//
//
// const app = express();
//
// app.use(express.json());
// app.use(cookieParser())
// app.use(express.urlencoded({ extended: true }));
//
//
// app.use('/api/user', userAPI);
// app.use('/api/scores', scoresAPI);
// app.use('/api/allGames', allGamesAPI);
//
//
// const MONGODB_URL = "mongodb+srv://hunter:banana2@seawebdevfall2021.ykjok.mongodb.net/?retryWrites=true&w=majority&appName=SeaWebDevFall2021"
// mongoose.connect(MONGODB_URL);
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
//
//
// const frontend_dir = path.join(path.resolve(), 'dist')
//
// app.use(express.static(frontend_dir));
// app.get('*', function (req, res) {
//     res.sendFile(path.join(frontend_dir, "index.html"));
// });
//
//
// app.listen(8000, function() {
//     console.log("Starting server now...")
// })