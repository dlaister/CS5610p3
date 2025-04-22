import {Schema} from 'mongoose';

const playerSchema = new Schema({
    username: {type: String, required: true},
    isCreator: {type: Boolean, required: true},
});

const allGamesSchema = new Schema({
    creator: {type: String, required: true},
    status: {type: String, enum: ['open', 'active', 'completed'], required: true},
    players: {
        type: [playerSchema],
        validate: {
            validator: function (players) {
                console.log('Validator fired:', players, 'Status:', this.status);
                if (this.status === 'open') {
                    return players.length === 1;
                }
                return players.length === 2;
            },
            message: 'Game must have exactly two players unless it is open',
        },
    },
    startTime: {type: Date, default: Date.now},
    endTime: {type: Date},
    winner: {type: String},
});

export default allGamesSchema;
