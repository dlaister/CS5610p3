import {Schema} from 'mongoose';

const scoresSchema = new Schema({
    username: { type: String, required: true, unique: true },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 }
});

export default scoresSchema;
