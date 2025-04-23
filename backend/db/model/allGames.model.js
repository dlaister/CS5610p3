import mongoose from 'mongoose';
import allGamesSchema from '../schema/allGames.schema.js';

const allGamesGames = mongoose.model('Game', allGamesSchema);

// Create a new game
export async function insertGame(game) {
    return await allGamesGames.create(game);
}

// Find a game by ID
export async function findGameById(id) {
    return await allGamesGames.findById(id).exec();
}

// Find all games (sorted by start time)
export async function getAllGames() {
    return await allGamesGames.find().sort({ startTime: -1 }).exec();
}

// Find games by username (creator or player)
export async function findGamesByUsername(username) {
    return await allGamesGames.find({
        $or: [{ creator: username }, { 'players.username': username }],
    }).sort({ startTime: -1 }).exec();
}

// Find my open games
export async function findMyOpenGames(username) {
    return await allGamesGames.find({
        status: 'open',
        creator: username,
    }).sort({ startTime: -1 }).exec();
}

// Find my active games
export async function findMyActiveGames(username) {
    return await allGamesGames.find({
        status: 'active',
        'players.username': username,
    }).sort({ startTime: -1 }).exec();
}

// Find my completed games
export async function findMyCompletedGames(username) {
    return await allGamesGames.find({
        status: 'completed',
        'players.username': username,
    }).sort({ startTime: -1 }).exec();
}

// Find open games created by other users
export async function findOpenGamesExcludingUser(username) {
    return await allGamesGames.find({
        status: 'open',
        creator: { $ne: username },
    }).sort({ startTime: -1 }).exec();
}

// Find other users' active or completed games
export async function findOtherGames(username) {
    return await allGamesGames.find({
        status: { $in: ['active', 'completed'] },
        'players.username': { $ne: username },
    }).sort({ startTime: -1 }).exec();
}

// Delete a game by ID
export async function deleteGameById(id) {
    return await allGamesGames.findByIdAndDelete(id).exec();
}

export default allGamesGames;
