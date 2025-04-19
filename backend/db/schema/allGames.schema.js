// TODO -- allGames.schema

import {Schema} from 'mongoose';

const allGamesSchema = new Schema({
    creator: { type: String, required: true },  // User ID of the creator
    players: [
        { type: String, required: true },
    ],
    status: { type: String, enum: ['open', 'active', 'completed'], required: true },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
    winner: { type: String },
});

export default allGamesSchema;
