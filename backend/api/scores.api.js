// TODO -- scores.api

// scores.api.js

import express from 'express';
import {
    insertScore,
    getAllScores,
    findScoreByUsername,
    updateScoreByUsername,
    deleteScoreByUsername
} from '../db/model/scores.model.js';

const router = express.Router();

// GET all scores sorted by: wins desc, losses asc, username asc
router.get('/', async (req, res) => {
    try {
        const scores = await getAllScores();

        scores.sort((a, b) => {
            if (b.wins !== a.wins) return b.wins - a.wins;
            if (a.losses !== b.losses) return a.losses - b.losses;
            return a.username.localeCompare(b.username);
        });

        res.status(200).json(scores);
    } catch (err) {
        res.status(500).json({message: 'Error fetching scores', error: err.message});
    }
});

// POST a new score
router.post('/', async (req, res) => {
    const {username, wins, losses} = req.body;

    try {
        const existing = await findScoreByUsername(username);
        if (existing) {
            return res.status(409).json({message: 'Username already exists.'});
        }

        const newScore = await insertScore({username, wins, losses});
        res.status(201).json(newScore);
    } catch (err) {
        res.status(500).json({message: 'Error creating score', error: err.message});
    }
});

// PUT to update a user’s score
router.put('/:username', async (req, res) => {
    const {username} = req.params;
    const {wins, losses} = req.body;

    if (wins === undefined || losses === undefined) {
        return res.status(400).json({message: 'Wins and losses must be provided.'});
    }

    try {
        const updatedScore = await updateScoreByUsername(username, {wins, losses});

        if (!updatedScore) {
            return res.status(404).json({message: 'User not found.'});
        }

        res.status(200).json(updatedScore);
    } catch (err) {
        res.status(500).json({message: 'Error updating score', error: err.message});
    }
});

// DELETE a score by username
router.delete('/:username', async (req, res) => {
    const {username} = req.params;

    try {
        const deleted = await deleteScoreByUsername(username);

        if (!deleted) {
            return res.status(404).json({message: 'User not found.'});
        }

        res.status(200).json({message: `Deleted ${username}'s score.`});
    } catch (err) {
        res.status(500).json({message: 'Error deleting score', error: err.message});
    }
});

export default router;
