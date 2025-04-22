import {Link} from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import "../../styles/global.css";
import "../../styles/game.css";
import "../../styles/home.css";
import Footer from "../../components/Footer.jsx";
import {useEffect, useState} from "react";


function AllGames() {
    const [games, setGames] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Fetch current user from cookies or session
        fetch("/api/users/current", {credentials: "include"})
            .then(res => res.json())
            .then(data => {
                setCurrentUser(data.username);

                // Fetch all games related to the current user
                fetch(`/api/games?userId=${data.username}`, {credentials: "include"})
                    .then(res => res.json())
                    .then(data => {
                        // Sort games by start time in descending order
                        const sortedGames = data.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
                        setGames(sortedGames);
                    })
                    .catch(err => console.error("Games fetch error:", err));
            })
            .catch(err => console.error("User fetch error:", err));
    }, []);

    const isGameCompleted = (game) => !!game.winner;
    const isGameActive = (game) => game.player2 && !game.winner;
    const isOpenGame = (game) => !game.player2 && game.player1 !== currentUser;
    const isMyOpenGame = (game) => !game.player2 && game.player1 === currentUser;
    const isMyActiveGame = (game) => isGameActive(game) && (game.player1 === currentUser || game.player2 === currentUser);
    const isMyCompletedGame = (game) => isGameCompleted(game) && (game.player1 === currentUser || game.player2 === currentUser);
    const isOtherGame = (game) => (isGameActive(game) || isGameCompleted(game)) &&
        game.player1 !== currentUser && game.player2 !== currentUser;

    const renderGameLink = (game) => (
        <Link to={`/game/${game._id}`}>Game #{game._id}</Link>
    );

    const renderTime = (date) => new Date(date).toLocaleString();

    return (
        <div className="home">
            <Navbar/>
            <main className="main">
                <header>
                    <h1>All Games</h1>
                </header>
                <div className="main-container">
                    {!currentUser ? (
                        <>
                            <section>
                                <h2>Active Games</h2>
                                {games.filter(isGameActive).map(game => (
                                    <div key={game._id}>
                                        {renderGameLink(game)} - {game.player1} vs {game.player2} -
                                        Started: {renderTime(game.startTime)}
                                    </div>
                                ))}
                            </section>

                            <section>
                                <h2>Completed Games</h2>
                                {games.filter(isGameCompleted).map(game => (
                                    <div key={game._id}>
                                        {renderGameLink(game)} - {game.player1} vs {game.player2} -
                                        Winner: {game.winner} -
                                        Started: {renderTime(game.startTime)} - Ended: {renderTime(game.endTime)}
                                    </div>
                                ))}
                            </section>
                        </>
                    ) : (
                        <>
                            <section>
                                <h2>Open Games</h2>
                                {games.filter(isOpenGame).map(game => (
                                    <div key={game._id}>
                                        {renderGameLink(game)} - Created by {game.player1}
                                        <button onClick={() => window.location.href = `/join/${game._id}`}>Join</button>
                                    </div>
                                ))}
                            </section>

                            <section>
                                <h2>My Open Games</h2>
                                {games.filter(isMyOpenGame).map(game => (
                                    <div key={game._id}>
                                        {renderGameLink(game)} - Started: {renderTime(game.startTime)}
                                    </div>
                                ))}
                            </section>

                            <section>
                                <h2>My Active Games</h2>
                                {games.filter(isMyActiveGame).map(game => (
                                    <div key={game._id}>
                                        {renderGameLink(game)} -
                                        Opponent: {game.player1 === currentUser ? game.player2 : game.player1}
                                    </div>
                                ))}
                            </section>

                            <section>
                                <h2>My Completed Games</h2>
                                {games.filter(isMyCompletedGame).map(game => (
                                    <div key={game._id}>
                                        {renderGameLink(game)} -
                                        Opponent: {game.player1 === currentUser ? game.player2 : game.player1} -
                                        Started: {renderTime(game.startTime)} - Ended: {renderTime(game.endTime)} -
                                        {game.winner === currentUser ? "You won!" : "You lost"}
                                    </div>
                                ))}
                            </section>

                            <section>
                                <h2>Other Games</h2>
                                {games.filter(isOtherGame).map(game => (
                                    <div key={game._id}>
                                        {renderGameLink(game)} - {game.player1} vs {game.player2} -
                                        Started: {renderTime(game.startTime)}
                                        {game.winner && <> - Ended: {renderTime(game.endTime)} -
                                            Winner: {game.winner}</>}
                                    </div>
                                ))}
                            </section>
                        </>
                    )}
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default AllGames;
