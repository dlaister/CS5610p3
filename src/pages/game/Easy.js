import {useState, useEffect} from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SetEnemyBoard from '../../components/SetEnemyBoard';
import '../../styles/global.css';
import '../../styles/normal.css';

function Easy() {
    const [enemyBoard, setEnemyBoard] = useState(Array(100).fill(null));
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval;
        if (gameStarted && !gameOver) {
            interval = setInterval(() => setTimer((t) => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [gameStarted, gameOver]);

    const formatTime = (seconds) => {
        const date = new Date(seconds * 1000);
        return date.toISOString().substr(11, 8);
    };

    const checkGameOver = (board) => {
        return board.every((cell) => cell === null || cell === "H" || cell === "M");
    };

    const attackEnemy = (index) => {
        if (!gameStarted) setGameStarted(true);
        if (gameOver || enemyBoard[index] === "H" || enemyBoard[index] === "M") return;

        let newBoard = [...enemyBoard];
        newBoard[index] = enemyBoard[index] !== null ? "H" : "M";
        setEnemyBoard(newBoard);

        if (checkGameOver(newBoard)) {
            setGameOver(true);
        }
    };

    const [resetTrigger, setResetTrigger] = useState(false);

    const resetGame = () => {
        setGameStarted(false);
        setTimer(0);
        setGameOver(false);
        setResetTrigger(prev => !prev); // Toggle the trigger to signal SetEnemyBoard to reset
    };

    return (
        <div className="play">
            <Navbar/>
            <main className="main">
                <header>
                    <h1>Battleship Game, Easy Mode</h1>
                </header>

                <div className="top-controls">
                    <p>
                        <span>Time:</span>
                        <span className="timerColor">{formatTime(timer)}</span>
                    </p>

                    <button onClick={resetGame} className="restart-button">
                        Reset Game
                    </button>
                </div>

                <div className="board-description">
                    Bellow, you can play against the enemy AI at will! Start at any time.
                </div>

                <h2>Enemy Board</h2>
                <div className="board">
                    <div className="board-headers">
                        <div className="header-cell"></div>
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((label) => (
                            <div key={label} className="header-cell">{label}</div>
                        ))}
                    </div>

                    <div className="grid-container">
                        {Array.from({length: 10}).map((_, rowIndex) => (
                            <div key={rowIndex} className="board-row">
                                <div className="header-cell">{rowIndex + 1}</div>
                                {enemyBoard.slice(rowIndex * 10, (rowIndex + 1) * 10).map((cell, index) => (
                                    <div
                                        key={index}
                                        className={`cell ${cell === "H" ? 'hit' : cell === "M" ? 'miss' : ''}`}
                                        onClick={() => attackEnemy(rowIndex * 10 + index)}
                                    >
                                        {cell === "H" ? "✔" : cell === "M" ? "✖" : ""}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <SetEnemyBoard setEnemyBoard={setEnemyBoard} resetTrigger={resetTrigger}/>

                {gameOver && <p className="game-over">Game Over!</p>}
            </main>
            <Footer/>
        </div>
    );

}

export default Easy;
