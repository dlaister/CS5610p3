import {useState, useEffect} from 'react';
import Navbar from '../../components/Navbar.jsx';
import Footer from '../../components/Footer.jsx';
import SetEnemyBoard from '../../components/SetEnemyBoard.jsx';
import '../../styles/global.css';
import '../../styles/normal.css';

function Normal() {
    const BOARD_SIZE = 10;

    // Board state (10x10 grid represented as a 1D array)
    const [enemyBoard, setEnemyBoard] = useState(Array(100).fill(null));

    // Ship state
    const [ships, setShips] = useState([
        {id: 'Carrier 5x1', size: 5, placed: false, positions: [], isHorizontal: true},
        {id: 'Battleship 4x1', size: 4, placed: false, positions: [], isHorizontal: true},
        {id: 'Cruiser 3x1', size: 3, placed: false, positions: [], isHorizontal: true},
        {id: 'Submarine 3x1', size: 3, placed: false, positions: [], isHorizontal: true},
        {id: 'Destroyer 2x1', size: 2, placed: false, positions: [], isHorizontal: true},
    ]);

    // Game state
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [playerBoard, setPlayerBoard] = useState(Array(100).fill(null));

    const [timer, setTimer] = useState(0);

    // Timer logic (start on first move, stop when game is over)
    useEffect(() => {
        let interval;
        if (gameStarted && !gameOver) {
            interval = setInterval(() => setTimer((t) => t + 1), 1000); // Update timer every second
        }
        return () => clearInterval(interval);
    }, [gameStarted, gameOver]);

    // Use Date object to format time as hh:mm:ss
    const formatTime = (seconds) => {
        const date = new Date(seconds * 1000); // Convert seconds to milliseconds
        return date.toISOString().substr(11, 8); // Extract hh:mm:ss part from the ISO string
    };

    const checkGameOver = (board) => {
        return board.every((cell) => cell === null || cell === "H" || cell === "M");
    };

    // Handle ship drag start
    const handleDragStart = (e, ship) => {
        if (ship.placed) {
            e.preventDefault(); // Prevent dragging if ship is placed
        } else {
            e.dataTransfer.setData('ship', JSON.stringify(ship));
            e.target.style.opacity = '0.5'; // Makes dragging effect visible
        }
    };

    const handleDragEnd = (e) => {
        e.target.style.opacity = '1'; // Restore opacity after dragging
    };

    // Handle dropping a ship onto the board
    const handleDrop = (e, index) => {
        e.preventDefault();
        const ship = JSON.parse(e.dataTransfer.getData('ship'));

        if (ship.placed) return; // Prevent re-placing the same ship

        const newBoard = [...playerBoard];
        const newShipPositions = getShipPositions(index, ship.size, ship.isHorizontal);

        if (!newShipPositions) return; // Prevent invalid placement

        // Prevent ship overlap
        if (newShipPositions.some(pos => newBoard[pos] !== null)) {
            alert("Ships cannot overlap!");
            return;
        }

        // Place ship
        ship.placed = true;
        ship.positions = newShipPositions;
        setShips((prevShips) => prevShips.map(s => s.id === ship.id ? {
            ...s,
            placed: true,
            positions: newShipPositions
        } : s));

        newShipPositions.forEach(pos => newBoard[pos] = ship.id);
        setPlayerBoard(newBoard);
    };

    // Get ship positions based on orientation (horizontal/vertical)
    const getShipPositions = (startIndex, size, isHorizontal) => {
        const positions = [];
        for (let i = 0; i < size; i++) {
            let newIndex;
            if (isHorizontal) {
                newIndex = startIndex + i;
                if (newIndex < 100 && Math.floor(newIndex / BOARD_SIZE) === Math.floor(startIndex / BOARD_SIZE)) {
                    positions.push(newIndex);
                } else {
                    return null; // Prevent wrapping around
                }
            } else {
                newIndex = startIndex + i * BOARD_SIZE; // Vertical placement
                if (newIndex < 100) {
                    positions.push(newIndex);
                } else {
                    return null; // Prevent wrapping around
                }
            }
        }
        return positions;
    };

    // Rotate ship (toggle horizontal/vertical)
    const handleRotate = (shipId) => {
        setShips((prevShips) => prevShips.map(ship => {
            if (ship.id === shipId && !ship.placed) {
                return {...ship, isHorizontal: !ship.isHorizontal};
            }
            return ship;
        }));
    };

    // Check if all ships are placed on teh player board
    const allShipsPlaced = () => {
        return ships.every(ship => ship.placed);
    };

    // Attack enemy board
    const attackEnemy = (index) => {
        if (!allShipsPlaced()) {
            alert("You must place all your ships before attacking!");
            return;
        }

        if (!gameStarted) setGameStarted(true);
        if (gameOver || !isPlayerTurn || enemyBoard[index] === "H" || enemyBoard[index] === "M") return;

        let newBoard = [...enemyBoard];
        newBoard[index] = enemyBoard[index] !== null ? "H" : "M";
        setEnemyBoard(newBoard);

        if (checkGameOver(newBoard)) {
            setGameOver(true);
            return;
        }

        setIsPlayerTurn(false);
        setTimeout(enemyAttack, 1000);
    };

    const enemyAttack = () => {
        if (gameOver) return;

        let availableCells = playerBoard
            .map((cell, index) => (cell !== "H" && cell !== "M" ? index : null))
            .filter(index => index !== null);

        if (availableCells.length === 0) return; // No more moves available

        let attackIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

        let newBoard = [...playerBoard];
        if (newBoard[attackIndex] !== null) {
            // Ship hit (indicating the ship was present on that position)
            newBoard[attackIndex] = "H"; // Mark as hit
        } else {
            // Miss
            newBoard[attackIndex] = "M"; // Mark as miss
        }
        setPlayerBoard(newBoard);

        if (checkGameOver(newBoard)) {
            setGameOver(true);
            return;
        }

        setIsPlayerTurn(true); // Switch back to player's turn
    };

    const [resetTrigger, setResetTrigger] = useState(false);

    // Reset game (including timer)
    const resetGame = () => {
        setGameStarted(false);  // Ensure timer stops
        setGameOver(false);
        setIsPlayerTurn(true);
        setPlayerBoard(Array(100).fill(null));
        setEnemyBoard(Array(100).fill(null));
        setShips([
            {id: 'Carrier 5x1', size: 5, placed: false, positions: [], isHorizontal: true},
            {id: 'Battleship 4x1', size: 4, placed: false, positions: [], isHorizontal: true},
            {id: 'Cruiser 3x1', size: 3, placed: false, positions: [], isHorizontal: true},
            {id: 'Submarine 3x1', size: 3, placed: false, positions: [], isHorizontal: true},
            {id: 'Destroyer 2x1', size: 2, placed: false, positions: [], isHorizontal: true},
        ]);

        setTimer(0);  // Reset timer

        setResetTrigger(prev => !prev); // Toggle reset trigger
    };


    const getShipClass = (shipId) => {
        return shipId.split(" ")[0].toLowerCase(); // Extract first word & lowercase
    };

    return (
        <div className="play">
            <Navbar/>

            <main className="main">
                <header>
                    <h1>Battleship Game, Normal Mode</h1>
                </header>

                {/* Timer and Reset Button */}
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
                    Bellow, you can set your board and play against the enemy AI!
                </div>

                {/* Ship Selection & Drag Area */}
                <div className="ship-selection">
                    <h2>Available Ships</h2>
                    {ships.some(ship => !ship.placed) ? (
                        ships.filter(ship => !ship.placed).map((ship) => (
                            <div
                                key={ship.id}
                                className={`ship-container ${getShipClass(ship.id)}`}
                            >
                                {/* Ship name */}
                                <div
                                    className="ship"
                                    draggable={!ship.placed}
                                    onDragStart={(e) => handleDragStart(e, ship)}
                                    onDragEnd={handleDragEnd}
                                >
                                    {ship.id}
                                </div>
                                {/* Rotate button */}
                                <button
                                    onClick={() => handleRotate(ship.id)}
                                    disabled={ship.placed}
                                    className="ship-button"
                                >
                                    {ship.isHorizontal ? 'Vertical' : 'Horizontal'}
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="all-placed-message">All ships are placed!</p>
                    )}
                </div>

                {/* Your Board */}
                <h2>Your Board</h2>
                <div className="board">
                    <div className="board-headers">
                        {/* Column headers A-J */}
                        <div className="header-cell"></div>
                        {/* Empty corner cell */}
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((label) => (
                            <div key={label} className="header-cell">{label}</div>
                        ))}
                    </div>
                    <div className="grid-container">
                        {/* Row headers 1-10 */}
                        {Array.from({length: 10}).map((_, rowIndex) => (
                            <div key={rowIndex} className="board-row">
                                <div className="header-cell">{rowIndex + 1}</div>
                                {playerBoard.slice(rowIndex * 10, (rowIndex + 1) * 10).map((cell, index) => {
                                    // Assign shipClass based on the cell's content (ship's ID)
                                    const shipClass = cell ? getShipClass(cell) : '';  // Using the getShipClass function to get the ship's class name

                                    let cellClass = '';

                                    if (cell === "H") {
                                        cellClass = 'hit'; // Add hit class for styling the hit state
                                    } else if (cell === "M") {
                                        cellClass = 'miss'; // Add miss class for styling the miss state
                                    }

                                    return (
                                        <div
                                            key={index}
                                            className={`cell ${cellClass} ${shipClass}`} // Combine the hit/miss and ship class
                                            onDrop={(e) => handleDrop(e, rowIndex * 10 + index)}
                                            onDragOver={(e) => e.preventDefault()}
                                        >
                                            {cell === "H" ? "✔" : cell === "M" ? "✖" : cell ? "●" : ""}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enemy Board */}
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

export default Normal;
