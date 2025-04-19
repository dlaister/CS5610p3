// TODO -- allGames.model

import mongoose from "mongoose";
import allGamesSchema from "../schema/allGames.schema.js";

const Game = mongoose.model("Game", allGamesSchema);

// Create a new game
export async function insertGame(game) {
    return await Game.create(game);
}

// Get all games
export async function getAllGames() {
    return await Game.find().exec();
}

// Get a game by its ID
export async function findGameById(id) {
    return await Game.findById(id).exec();
}

// Find games related to a specific user (either as creator or opponent)
export async function findGamesByUserId(userId) {
    return await Game.find({
        $or: [
            {'players.opponent': userId},
            {'creator': userId},
        ]
    }).exec();
}

// Update a game by its ID
export async function updateGameById(id, updateData) {
    return await Game.findByIdAndUpdate(id, updateData, {new: true}).exec();
}

// Delete a game by its ID
export async function deleteGameById(id) {
    return await Game.findByIdAndDelete(id).exec();
}
