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

// Get all games
router.get('/', async (req, res) => {
    try {
        const {username} = req.query;

        if (username) {
            // Logged-in user: return all categorized sections
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
        } else {
            // Logged-out user: return only open, active, and completed games
            const [openGames, allGames] = await Promise.all([
                findOpenGamesExcludingUser(), // now safe to call with no username
                getAllGames(),
            ]);

            const activeGames = allGames.filter(
                (g) => g.players.length === 2 && g.status === 'active'
            );
            const completedGames = allGames.filter((g) => g.status === 'completed');

            return res.json({
                openGames,
                activeGames,
                completedGames,
            });
        }
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch games', details: err});
    }
});


// Get my open games
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

// Get my active games
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

// Get my completed games
router.get('/my-completed', async (req, res) => {
    const {username} = req.query;
    if (!username) return res.status(400).json({error: 'Username is required'});

    try {
        const games = await findMyCompletedGames(username);
        const gamesWithDetails = games.map(game => {
            const opponent = game.players.find(player => player.username !== username);
            return {
                ...game.toObject(),
                opponent: opponent?.username,
                endTime: game.endTime,
                winner: game.winner
            };
        });
        res.json(gamesWithDetails);
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch my completed games', details: err});
    }
});


// Get open games (excluding creator)
router.get('/open', async (req, res) => {
    const username = req.query.username || null;

    try {
        let games;

        if (username) {
            games = await findOpenGamesExcludingUser(username);
        } else {
            // If no username, return all open games
            games = await findOpenGamesExcludingUser(); // Or a different function like findAllOpenGames()
        }

        res.json(games);
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch open games', details: err});
    }
});


// Get other games
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
