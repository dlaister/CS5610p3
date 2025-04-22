import {Link} from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import "../../styles/global.css";
import "../../styles/game.css";
import "../../styles/home.css";
import Footer from "../../components/Footer.jsx";
import {useEffect, useState} from "react";
import axios from "axios";


function AllGames() {
    const [games, setGames] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await axios.get("/api/allGames", {
                    withCredentials: true,
                });

                if (res.data && res.data.username) {
                    setUsername(res.data.username);
                }

                setGames(res.data.games || res.data); // fallback for non-logged-in
                setLoading(false);
            } catch (err) {
                console.error("Error fetching games:", err);
                setError("Failed to load games");
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    if (loading) return <div className="home"><Navbar/><main className="main"><p>Loading games...</p></main><Footer/></div>;
    if (error) return <div className="home"><Navbar/><main className="main"><p>{error}</p></main><Footer/></div>;

    const renderGames = (title, gamesList) => (
        <section className="game-section">
            <h2>{title}</h2>
            {gamesList.length === 0 ? (
                <p>No games to show.</p>
            ) : (
                <ul>
                    {gamesList.map((game) => (
                        <li key={game._id}>
                            <Link to={`/game/${game._id}`}>Game #{game._id.slice(-5)}</Link>{" "}
                            {game.creator && <span> by {game.creator}</span>}
                            {game.players && (
                                <span>
                                    {" "}— Players: {game.players.map(p => p.username).join(" vs ")}
                                </span>
                            )}
                            {game.status === "completed" && (
                                <span> — Winner: {game.winner || "Unknown"}</span>
                            )}
                            <div>
                                <small>
                                    Started: {new Date(game.startTime).toLocaleString()}
                                    {game.endTime && ` | Ended: ${new Date(game.endTime).toLocaleString()}`}
                                </small>
                            </div>
                            {title === "Open Games" && (
                                <button onClick={() => joinGame(game._id)}>Join</button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );

    const joinGame = async (gameId) => {
        try {
            await axios.post(`/api/allGames/${gameId}/join`, {}, { withCredentials: true });
            window.location.href = `/game/${gameId}`;
        } catch (err) {
            alert("Could not join game.");
            console.error(err);
        }
    };

    return (
        <div className="home">
            <Navbar/>
            <main className="main">
                <header>
                    <h1>All Games</h1>
                </header>
                <div className="main-container">
                    {username ? (
                        <>
                            {renderGames("Open Games", games.openGames || [])}
                            {renderGames("My Open Games", games.myOpenGames || [])}
                            {renderGames("My Active Games", games.myActiveGames || [])}
                            {renderGames("My Completed Games", games.myCompletedGames || [])}
                            {renderGames("Other Games", games.otherGames || [])}
                        </>
                    ) : (
                        <>
                            {renderGames("Active Games", games.activeGames || [])}
                            {renderGames("Completed Games", games.completedGames || [])}
                        </>
                    )}
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default AllGames;