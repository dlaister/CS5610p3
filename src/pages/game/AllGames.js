// TODO -- all games
/*
All Games Page
URL structure - /games

We need a way for players to manage and see all their games.  On the all games page, you will need to show 5 sections pieces of information:
Open Games: a list of all games that have been started by OTHER players.  Include a link to the start page, a button to join (and then redirect) to the game page
My Open Games: a list of all the games that the logged in player has started but no one else has joined.  Make sure to show the start time and a link to the game page.
My Active Games: a list of all the games that have a second player.  Include the name of the opponent, a link
My Completed Games: include a list of all the games that the current user ONLY has participated in.  Include a link to the game page, the name of the opponent, the start/end time and whether the active player has won or not.
Other Games: include all active games or completed games that the active is NOT part of.  Include a link to that game page, the start time and the 2 active users.  If the game is completed, show the end time and indicate who won the game.

If a logged in user goes to this page, they should just see all the games in 2 sections:
Active games: games that are currently ongoing and have 2 players.  Please list the players participating in the game and the time/date that the game started.
Completed games: games that are now over.  Please display the participating players, the winner of the game, the start time and the end time.

*/

import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/global.css';
import '../styles/home.css';

function Games({ games, currentUser }) {
    // Helpers
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
            <Navbar />
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
                                        {renderGameLink(game)} - {game.player1} vs {game.player2} - Started: {renderTime(game.startTime)}
                                    </div>
                                ))}
                            </section>

                            <section>
                                <h2>Completed Games</h2>
                                {games.filter(isGameCompleted).map(game => (
                                    <div key={game._id}>
                                        {renderGameLink(game)} - {game.player1} vs {game.player2} - Winner: {game.winner} -
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
                                        {renderGameLink(game)} - Opponent: {game.player1 === currentUser ? game.player2 : game.player1}
                                    </div>
                                ))}
                            </section>

                            <section>
                                <h2>My Completed Games</h2>
                                {games.filter(isMyCompletedGame).map(game => (
                                    <div key={game._id}>
                                        {renderGameLink(game)} - Opponent: {game.player1 === currentUser ? game.player2 : game.player1} -
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
                                        {game.winner && <> - Ended: {renderTime(game.endTime)} - Winner: {game.winner}</>}
                                    </div>
                                ))}
                            </section>
                        </>
                    )}

                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Games;
