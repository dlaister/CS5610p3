import Navbar from '../components/Navbar.jsx';
import '../styles/global.css';
import '../styles/rules.css';
import Footer from '../components/Footer.jsx';


function Rules() {
    return (
        <div className="rules">
            <Navbar/>

            <main className="main">
                <header>
                    <h1>Battleship Rules</h1>
                </header>

                <div className="main-container">
                    <header>
                        <h2>The Game of Battleship:</h2>
                    </header>

                    <div>
                        <p>Battleship is a classic two-player game of naval strategy where players attempt to sink each
                            other's fleet of ships. Here are the basic rules for playing Battleship:</p>

                        <p><span className="blue-text">Game Components:</span></p>
                        <ul>
                            <li>Game Boards: Each player has a primary ocean grid (10x10) for positioning their fleet
                                and a secondary targeting grid to track shots fired.
                            </li>
                            <li>Ships: Each player has a fleet of five ships:</li>
                            <ol>
                                <li>Carrier (5 spaces)</li>
                                <li>Battleship (4 spaces)</li>
                                <li>Cruiser (3 spaces)</li>
                                <li>Submarine (3 spaces)</li>
                                <li>Destroyer (2 spaces)</li>
                            </ol>
                            <li>Peg Markers: White pegs to mark misses, and red pegs to mark hits.</li>
                        </ul>

                        <p><span className="blue-text">Setup:</span></p>
                        <ul>
                            <li>Positioning Ships:</li>
                            <ul>
                                <li>Each player places their five ships on their ocean grid. Ships can be placed either
                                    horizontally or vertically, but not diagonally.
                                </li>
                                <li>Ships must be placed within the boundaries of the grid and cannot overlap each
                                    other.
                                </li>
                                <li>Each player keeps their ship placement hidden from the other player.</li>
                            </ul>
                        </ul>

                        <p><span className="blue-text">Gameplay Overview:</span></p>
                        <p>Players take turns calling out coordinates to attack the opponent's ships, attempting to
                            guess the locations of the ships.</p>
                        <ul>
                            <li>Calling a Shot:</li>
                            <ul>
                                <li>On a player's turn, they call out a coordinate (e.g., "B7").</li>
                                <li>The opponent checks their ocean grid and announces whether the shot is a "hit" or a
                                    "miss".
                                </li>
                                <ul>
                                    <li>If it’s a hit, the opponent places a red peg on their ship at that coordinate.
                                    </li>
                                    <li>If it’s a miss, the opponent places a white peg on their ocean grid at that
                                        coordinate.
                                    </li>
                                </ul>
                                <li>The player calling the shot marks their targeting grid with a red peg for a hit or a
                                    white peg for a miss.
                                </li>
                            </ul>
                            <li>Recording Hits and Misses:</li>
                            <ul>
                                <li>Players keep track of their hits and misses on their targeting grid to help refine
                                    their strategy.
                                </li>
                                <li>Each time a ship is hit but not sunk, the player must say "hit" and specify which
                                    ship was hit once the ship is sunk (e.g., "You sank my battleship").
                                </li>
                            </ul>
                        </ul>

                        <p><span className="blue-text">Sinking Ships:</span></p>
                        <ul>
                            <li>A ship is considered sunk when all of its coordinates have been hit.</li>
                            <li>The opponent must announce which ship has been sunk.</li>
                        </ul>

                        <p><span className="blue-text">Winning the Game:</span></p>
                        <ul>
                            <li>The game continues in alternating turns until one player has sunk all five of their
                                opponent’s ships.
                            </li>
                            <li>The first player to sink all of their opponent's ships is the winner.</li>
                        </ul>

                        <p><span className="blue-text">Advanced Rules and Variations:</span></p>
                        <p>For added complexity, some players may choose to incorporate advanced rules or
                            variations:</p>
                        <ol>
                            <li>Salvo: Each player may fire multiple shots per turn equal to the number of ships they
                                have remaining.
                            </li>
                            <li>Special Weapons: Introduce special weapons like "air strikes" or "torpedoes" that have
                                different rules for targeting and hitting ships.
                            </li>
                            <li>Fog of War: Players do not announce the type of ship hit, only whether it is a hit or
                                miss, increasing the challenge of deducing ship placements.
                            </li>
                        </ol>

                        <p><span className="blue-text">Tips and Strategies:</span></p>
                        <ul>
                            <li>Balanced Distribution: Avoid clustering your ships too closely together to make it
                                harder for your opponent to score consecutive hits.
                            </li>
                            <li>Pattern Shots: Use patterns like checkerboards or systematic sweeps to ensure thorough
                                coverage of the grid.
                            </li>
                            <li>Battleship is a game of strategic thinking, careful planning, and a bit of luck. By
                                following these rules and developing your own strategies, you can enjoy countless hours
                                of naval warfare fun.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="center-box">
                    <div className="content-box">
                        <h2>About the Author</h2>
                        <p>This game is the property of Hasbro, Inc. This is a project purely for demonstration purposes
                            in which to build a website.</p>
                        <p>My name is Derek, and this site is made by me.</p>
                        <ul>
                            <li><a href="https://github.com/dlaister">Github</a></li>
                            <li><a href="mailto:someone@example.com">Email</a></li>
                            <li><a href="https://linkedin.com/dereklaister">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>

            </main>

            <Footer/>
        </div>
    );
}

export default Rules;
