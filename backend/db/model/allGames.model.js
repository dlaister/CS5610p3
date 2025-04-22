import mongoose from 'mongoose';
import allGamesSchema from '../schema/allGames.schema.js';

const allGamesGames = mongoose.model('Game', allGamesSchema);

// Create a new game
export async function insertGame(game) {
    return await allGamesGames.create(game); // Schema handles all validation
}

// Find a game by ID
export async function findGameById(id) {
    return await allGamesGames.findById(id).exec();
}

// Find all games
export async function getAllGames() {
    return await allGamesGames.find().sort({ startTime: -1 }).exec();
}

// Find games by username (creator or player)
export async function findGamesByUsername(username) {
    return await allGamesGames.find({
        $or: [
            { creator: username },
            { 'players.username': username },
        ],
    }).sort({ startTime: -1 }).exec();
}

// Delete a game by ID
export async function deleteGameById(id) {
    return await allGamesGames.findByIdAndDelete(id).exec();
}


export default allGamesGames;
