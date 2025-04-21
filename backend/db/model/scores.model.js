import mongoose from "mongoose";
import scoresSchema from "../schema/scores.schema.js";

const Score = mongoose.model("Score", scoresSchema);

// Insert a new score entry
export async function insertScore(score) {
    return await Score.create(score);
}

// Get all scores
export async function getAllScores() {
    return await Score.find().exec();
}

// Find score by username
export async function findScoreByUsername(username) {
    return await Score.findOne({username}).exec();
}

// Update a score by username
export async function updateScoreByUsername(username, updateData) {
    return await Score.findOneAndUpdate({username}, updateData, {new: true}).exec();
}

// Patch (partially update) score by username (only wins and losses)
export async function patchScoreByUsername(username, updateData) {
    const updateFields = {}; // Initialize the fields to update

    if (updateData.wins !== undefined) {
        updateFields.wins = updateData.wins;
    }
    if (updateData.losses !== undefined) {
        updateFields.losses = updateData.losses;
    }

    return await Score.findOneAndUpdate(
        { username },
        { $set: updateFields },
        { new: true }
    ).exec();
}

// Delete a score by username
export async function deleteScoreByUsername(username) {
    return await Score.findOneAndDelete({username}).exec();
}
