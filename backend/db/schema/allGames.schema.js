import {Schema} from 'mongoose';

const allGamesSchema = new Schema({
    creator: { type: String, required: true },  // User
    players: [
        { type: String, required: true },       // User
    ],
    status: { type: String, enum: ['open', 'active', 'completed'], required: true },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
    winner: { type: String },
});

export default allGamesSchema;
