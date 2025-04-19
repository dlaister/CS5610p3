import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar.jsx';
import '../../styles/global.css';
import '../../styles/game.css';
import Footer from '../../components/Footer.jsx';

function Game() {
    return (
        <div className="sample">
            <Navbar />
            <main className="main">
                <header>
                    <h1>Battleship Game</h1>
                </header>

                <div className="main-container">
                    <div className="game-mode-div">
                        <h3 className="sub-main">Select a game mode to start playing!</h3>

                        <div className="game-mode">
                            <h2>Easy Mode:</h2>
                            <h4>Click <Link to="/game/easy" className="btn">here</Link> to play against the AI only the board.</h4>
                        </div>

                        <div className="game-mode">
                            <h2>Normal Mode:</h2>
                            <h4>Click <Link to="/game/normal" className="btn">here</Link> to play a normal game where you setup your board and play against an AI opponent.</h4>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Game;
