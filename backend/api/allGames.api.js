import express from 'express';
import {
    getAllGames,
    findGameById,
    insertGame,
    deleteGameById,
} from '../db/model/allGames.model.js';

const router = express.Router();

// Get all games
router.get('/', async (req, res) => {
    try {
        const { username } = req.query;
        const allGames = await getAllGames();

        const isLoggedIn = !!username;

        if (!isLoggedIn) {
            const activeGames = allGames.filter(
                (g) => g.players.length === 2 && g.status === 'active'
            );
            const completedGames = allGames.filter((g) => g.status === 'completed');
            return res.json({ activeGames, completedGames });
        }

        const openGames = allGames.filter(
            (g) => g.status === 'open' && g.creator !== username
        );
        const myOpenGames = allGames.filter(
            (g) => g.status === 'open' && g.creator === username
        );
        const myActiveGames = allGames.filter((g) =>
            g.status === 'active' &&
            g.players.some((p) => p.username === username)
        );
        const myCompletedGames = allGames.filter((g) =>
            g.status === 'completed' &&
            g.players.some((p) => p.username === username)
        );
        const otherGames = allGames.filter(
            (g) =>
                (g.status === 'active' || g.status === 'completed') &&
                !g.players.some((p) => p.username === username)
        );

        return res.json({
            openGames,
            myOpenGames,
            myActiveGames,
            myCompletedGames,
            otherGames,
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch games', details: err });
    }
});

// Get a game by ID
router.get('/:id', async (req, res) => {
    try {
        const game = await findGameById(req.params.id);
        if (!game) return res.status(404).json({ error: 'Game not found' });
        res.json(game);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch game', details: err });
    }
});

// Create a new game
router.post('/', async (req, res) => {
    try {
        const { creator, opponent, status } = req.body;

        // Validate that creator is provided
        if (!creator) {
            return res.status(400).json({ error: 'Creator is required' });
        }

        // If the game is open, don't require an opponent
        if (status === 'open' && !opponent) {
            // Proceed with creating an open game
            const gameData = {
                creator,
                players: [{ username: creator, isCreator: true }],
                status: 'open',
                startTime: new Date(), // You can set the start time as the current time
            };
            const game = await insertGame(gameData);
            return res.status(201).json(game);
        }

        // For non-open games (active, completed), both creator and opponent are required
        if (!opponent) {
            return res.status(400).json({ error: 'Both creator and opponent are required' });
        }

        // For other statuses, create the game with both creator and opponent
        const gameData = {
            creator,
            players: [
                { username: creator, isCreator: true },
                { username: opponent, isCreator: false }
            ],
            status,
            startTime: new Date(), // You can set the start time as the current time
        };

        const game = await insertGame(gameData);
        res.status(201).json(game);
    } catch (err) {
        console.error('Error creating game:', err); // Log error details
        res.status(400).json({ error: 'Failed to create game', details: err.message });
    }
});

// Delete a game by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteGameById(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Game not found' });
        }
        res.json({ message: 'Game deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete game', details: err.message });
    }
});



export default router;
