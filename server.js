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
app.use(express.urlencoded({ extended: true }));


// TODO -- add routes or remove?
app.use('/api/user', userAPI);
app.use('/api/battleship', battleshipAPI);


// const MONGODB_URL = "mongodb+srv://derek:<CS561025>@clustercs5610.gud4glr.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCS5610"
// mongoose.connect(MONGODB_URL);
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
//
//
// app.listen(8000, function () {
//     console.log('Starting server...');
// })

// Connect to MongoDB using the .env
// const MONGODB_URL = process.env.MONGODB_URL;
//
// mongoose.connect(MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
//
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
// db.once('open', () => {
//     console.log('Connected to MongoDB');
// });
//
// // Start Server
// app.listen(process.env.PORT || 8000, () => {
//     console.log('Server is running...');
// });

// Connect to MongoDB using the .env with connection status for debugging
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("MongoDB connected successfully.");
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
    });

app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running...');
});