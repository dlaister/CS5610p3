import {Link} from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import "../../styles/global.css";
import "../../styles/game.css";
import "../../styles/home.css";
import {useEffect, useState} from "react";
import axios from "axios";

function AllGames() {
    const [games, setGames] = useState({
        myOpenGames: [],
        myActiveGames: [],
        myCompletedGames: [],
        openGames: [],
        otherGames: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        // Detect login status by checking for the "user" cookie
        const cookie = document.cookie
            .split("; ")
            .find(row => row.startsWith("user="));

        if (cookie) {
            const user = cookie.split("=")[1];
            setUsername(user);

            // Fetch games for the logged-in user
            const fetchGames = async () => {
                try {
                    // Fetch my open games
                    const myOpenGamesRes = await axios.get("/api/allGames/my-open", {
                        params: {username: user},
                        withCredentials: true,
                    });
                    const myOpenGames = myOpenGamesRes.data;

                    // Fetch my active games
                    const myActiveGamesRes = await axios.get("/api/allGames/my-active", {
                        params: {username: user},
                        withCredentials: true,
                    });
                    const myActiveGames = myActiveGamesRes.data;

                    // Fetch my completed games
                    const myCompletedGamesRes = await axios.get("/api/allGames/my-completed", {
                        params: {username: user},
                        withCredentials: true,
                    });
                    const myCompletedGames = myCompletedGamesRes.data;

                    // Fetch open games (excluding user) only for logged-in users
                    const openGamesRes = await axios.get("/api/allGames/open", {
                        withCredentials: true,
                    });
                    const openGames = openGamesRes.data;

                    // Fetch other games only for logged-in users
                    const otherGamesRes = await axios.get("/api/allGames/other", {
                        params: {username: user},
                        withCredentials: true,
                    });
                    const otherGames = otherGamesRes.data;

                    // Set the game data to state
                    setGames({
                        myOpenGames,
                        myActiveGames,
                        myCompletedGames,
                        openGames,
                        otherGames,
                    });

                    setLoading(false);
                } catch (err) {
                    console.error("Error fetching games:", err);
                    setError("Failed to load games.");
                    setLoading(false);
                }
            };

            fetchGames();
        } else {
            // Fetch open and other games for logged-out users
            const fetchOpenAndOtherGames = async () => {
                try {
                    // Fetch open games (no username needed)
                    const openGamesRes = await axios.get("/api/allGames/open", {
                        withCredentials: true,
                    });
                    const openGames = openGamesRes.data;

                    // Fetch other games (no username needed)
                    const otherGamesRes = await axios.get("/api/allGames/other", {
                        withCredentials: true,
                    });
                    const otherGames = otherGamesRes.data;

                    // Set the game data to state
                    setGames({
                        openGames,
                        otherGames,
                        myOpenGames: [], // Empty for logged-out users
                        myActiveGames: [],
                        myCompletedGames: [],
                    });

                    setLoading(false);
                } catch (err) {
                    console.error("Error fetching open and other games:", err);
                    setError("Failed to load games.");
                    setLoading(false);
                }
            };

            fetchOpenAndOtherGames();
        }
    }, []);

    const renderGames = (title, gamesList, isActive = false, isCompleted = false) => (
        <section className="game-section">
            <h2>{title}</h2>
            {gamesList.length === 0 ? (
                <p>No games to show.</p>
            ) : (
                <ul>
                    {gamesList.map((game) => (
                        <li key={game._id}>
                            <Link to={`/game/${game._id}`}>Game #{game._id.slice(-5)}</Link>
                            {game.creator && <span> by {game.creator}</span>}
                            <div>
                                <small>
                                    Started: {new Date(game.startTime).toLocaleString()}
                                    {game.endTime && ` | Ended: ${new Date(game.endTime).toLocaleString()}`}
                                    {isActive && game.players && game.players.map((player, index) => (
                                        <span key={index}>{player.username} </span>
                                    ))}
                                    {isCompleted && game.winner && <span> | Winner: {game.winner}</span>}
                                </small>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );

    if (loading) {
        return <div className="home"><Navbar/>
            <main className="main"><p>Loading games...</p></main>
            <Footer/></div>;
    }

    if (error) {
        return <div className="home"><Navbar/>
            <main className="main"><p>{error}</p></main>
            <Footer/></div>;
    }

    return (
        <div className="home">
            <Navbar/>
            <main className="main">
                <header><h1>All Games</h1></header>
                <div className="main-container">
                    {username ? (
                        <>
                            {renderGames("Open Games", games.openGames)}
                            {renderGames("My Open Games", games.myOpenGames)}
                            {renderGames("My Active Games", games.myActiveGames, true)}
                            {renderGames("My Completed Games", games.myCompletedGames, true, true)}
                            {renderGames("Other Games", games.otherGames)}
                        </>
                    ) : (
                        <>
                            {renderGames("Open Games", games.openGames)}
                            {renderGames("Other Games", games.otherGames)}
                        </>
                    )}
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default AllGames;

// works for logged in only, does not show winner