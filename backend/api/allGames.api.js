import express from 'express';
import {
    insertGame,
    findGamesByUserId,
    getAllGames, // Added to get all games for general listing
    updateGameById,
    deleteGameById
} from '../db/model/allGames.model.js';

const router = express.Router();

// GET all games, accessible to everyone (admin or logged-in users)
router.get('/', async (req, res) => {
    try {
        const games = await getAllGames();
        res.status(200).json(games);
    } catch (err) {
        res.status(500).json({message: 'Error fetching games', error: err.message});
    }
});

// GET current user's games
router.get('/current', async (req, res) => {
    const {userId} = req.cookies; // Assuming userId is stored in cookies for logged-in users
    if (!userId) {
        return res.status(401).json({message: 'Not logged in'});
    }

    try {
        const games = await findGamesByUserId(userId);
        res.status(200).json(games);
    } catch (err) {
        res.status(500).json({message: 'Error fetching games for user', error: err.message});
    }
});

// POST: create a new game
router.post('/', async (req, res) => {
    const {creator, players} = req.body;

    try {
        const newGame = await insertGame({creator, players, status: 'open'});
        res.status(201).json(newGame);
    } catch (err) {
        res.status(500).json({message: 'Error creating game', error: err.message});
    }
});

// PUT: update an existing game
router.put('/:gameId', async (req, res) => {
    const {gameId} = req.params;
    const updateData = req.body;

    try {
        const updatedGame = await updateGameById(gameId, updateData);

        if (!updatedGame) {
            return res.status(404).json({message: 'Game not found.'});
        }

        res.status(200).json(updatedGame);
    } catch (err) {
        res.status(500).json({message: 'Error updating game', error: err.message});
    }
});

// DELETE: remove a game
router.delete('/:gameId', async (req, res) => {
    const {gameId} = req.params;

    try {
        const deletedGame = await deleteGameById(gameId);

        if (!deletedGame) {
            return res.status(404).json({message: 'Game not found.'});
        }

        res.status(200).json({message: `Deleted game with ID: ${gameId}`});
    } catch (err) {
        res.status(500).json({message: 'Error deleting game', error: err.message});
    }
});

export default router;
