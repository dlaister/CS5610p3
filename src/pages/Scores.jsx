import Navbar from '../components/Navbar.jsx';
import '../styles/global.css';
import '../styles/scores.css';
import Footer from '../components/Footer.jsx';
import { useEffect, useState } from "react";

function Scores() {
    const [scores, setScores] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const cookie = document.cookie
            .split("; ")
            .find(row => row.startsWith("user=")); // Updated to "user" cookie
        if (cookie) {
            const user = cookie.split("=")[1];
            setCurrentUser(user);
        }
    }, []);

    useEffect(() => {
        fetch("/api/scores/")
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => {
                    if (b.wins !== a.wins) return b.wins - a.wins;
                    if (a.losses !== b.losses) return a.losses - b.losses;
                    return a.username.localeCompare(b.username);
                });
                setScores(sorted);
            })
            .catch(err => console.error("Error fetching scores:", err));
    }, []);

    const hasScores = scores.length > 0;

    return (
        <div className="scores">
            <Navbar />

            <main className="main">
                <header>
                    <h1>Battleship Scores</h1>
                </header>

                <div className="main-container">
                    <div className="container">
                        {/* Player Names */}
                        <div className="leftBar">
                            <h4>Player Name</h4>
                            {hasScores ? (
                                scores.map((player, index) => (
                                    <p
                                        key={index}
                                        className={player.username === currentUser ? "highlight-user" : ""}
                                    >
                                        {player.username}
                                    </p>
                                ))
                            ) : (
                                <p>No scores to display.</p>
                            )}
                        </div>

                        {/* Games Lost */}
                        <div className="mainContent">
                            <h4>Games Lost</h4>
                            {hasScores ? (
                                scores.map((player, index) => (
                                    <p key={index} className={player.username === currentUser ? "highlight-user" : ""}>
                                        {player.losses}
                                    </p>
                                ))
                            ) : (
                                <p>No games lost.</p>
                            )}
                        </div>

                        {/* Games Won */}
                        <div className="rightBar">
                            <h4>Games Won</h4>
                            {hasScores ? (
                                scores.map((player, index) => (
                                    <p key={index} className={player.username === currentUser ? "highlight-user" : ""}>
                                        {player.wins}
                                    </p>
                                ))
                            ) : (
                                <p>No games won.</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Scores;
