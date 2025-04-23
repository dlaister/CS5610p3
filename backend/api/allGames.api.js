import express from 'express';
import {
    getAllGames,
    findGameById,
    insertGame,
    deleteGameById,
    findMyOpenGames,
    findMyActiveGames,
    findMyCompletedGames,
    findOpenGamesExcludingUser,
    findOtherGames,
} from '../db/model/allGames.model.js';

const router = express.Router();

// Get all categorized games
router.get('/', async (req, res) => {
    try {
        const {username} = req.query;

        if (!username) {
            const allGames = await getAllGames();
            const activeGames = allGames.filter(g => g.players.length === 2 && g.status === 'active');
            const completedGames = allGames.filter(g => g.status === 'completed');
            return res.json({activeGames, completedGames});
        }

        const [openGames, myOpenGames, myActiveGames, myCompletedGames, otherGames] =
            await Promise.all([
                findOpenGamesExcludingUser(username),
                findMyOpenGames(username),
                findMyActiveGames(username),
                findMyCompletedGames(username),
                findOtherGames(username),
            ]);

        return res.json({
            openGames,
            myOpenGames,
            myActiveGames,
            myCompletedGames,
            otherGames,
        });
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch games', details: err});
    }
});

// My open games
router.get('/my-open', async (req, res) => {
    const {username} = req.query;
    if (!username) return res.status(400).json({error: 'Username is required'});

    try {
        const games = await findMyOpenGames(username);
        res.json(games);
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch my open games', details: err});
    }
});

// My active games
router.get('/my-active', async (req, res) => {
    const {username} = req.query;
    if (!username) return res.status(400).json({error: 'Username is required'});

    try {
        const games = await findMyActiveGames(username);
        const gamesWithOpponent = games.map(game => {
            // Find the second player in the game, excluding the current user
            const opponent = game.players.find(player => player.username !== username);
            return {...game.toObject(), opponent: opponent?.username}; // Use players
        });
        res.json(gamesWithOpponent);
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch my active games', details: err});
    }
});

// My completed games
router.get('/my-completed', async (req, res) => {
    const {username} = req.query;
    if (!username) return res.status(400).json({error: 'Username is required'});

    try {
        const games = await findMyCompletedGames(username);
        const gamesWithDetails = games.map(game => {
            const opponent = game.players.find(player => player.username !== username);
            return {
                ...game.toObject(),
                opponent: opponent?.username, // Use players here
                endTime: game.endTime, // Ensure endTime is present
                winner: game.winner // Include winner field
            };
        });
        res.json(gamesWithDetails);
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch my completed games', details: err});
    }
});


// Open games (excluding creator)
router.get('/open', async (req, res) => {
    const {username} = req.query;

    try {
        const games = await findOpenGamesExcludingUser(username);
        res.json(games);
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch open games', details: err});
    }
});

// Other games
router.get('/other', async (req, res) => {
    const {username} = req.query;
    if (!username) return res.status(400).json({error: 'Username is required'});

    try {
        const games = await findOtherGames(username);
        res.json(games);
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch other games', details: err});
    }
});

// Get a game by ID
router.get('/:id', async (req, res) => {
    try {
        const game = await findGameById(req.params.id);
        if (!game) return res.status(404).json({error: 'Game not found'});
        res.json(game);
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch game', details: err});
    }
});

// Create a new game
router.post('/', async (req, res) => {
    try {
        const {creator, opponent, status} = req.body;

        if (!creator) return res.status(400).json({error: 'Creator is required'});

        let gameData;

        if (status === 'open' && !opponent) {
            gameData = {
                creator,
                players: [{username: creator, isCreator: true}],
                status: 'open',
                startTime: new Date(),
            };
        } else {
            if (!opponent) return res.status(400).json({error: 'Opponent is required for non-open games'});
            gameData = {
                creator,
                players: [
                    {username: creator, isCreator: true},
                    {username: opponent, isCreator: false},
                ],
                status,
                startTime: new Date(),
            };
        }

        const game = await insertGame(gameData);
        res.status(201).json(game);
    } catch (err) {
        console.error('Error creating game:', err);
        res.status(400).json({error: 'Failed to create game', details: err.message});
    }
});

// Delete a game
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await deleteGameById(req.params.id);
        if (!deleted) return res.status(404).json({error: 'Game not found'});
        res.json({message: 'Game deleted successfully'});
    } catch (err) {
        res.status(500).json({error: 'Failed to delete game', details: err.message});
    }
});

export default router;


// current build works for logged in only...