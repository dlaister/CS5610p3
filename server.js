// TODO -- sever
import express from 'express';
// import randomNumberGenerator from './backend/utils.js';
import mongoose from 'mongoose';
import battleshipAPI from './backend/api/battleship.api.js';
import userAPI from './backend/api/users.api.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));


app.use('/api/battleship.api.js', battleshipAPI)
app.use('/api/users.api.js', userAPI);


const MONGODB_URL = "mongodb+srv://derek:CS561025@clustercs5610.gud4glr.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCS5610"
mongoose.connect(MONGODB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));


app.listen(8000, function () {
    console.log('Starting server...');
})