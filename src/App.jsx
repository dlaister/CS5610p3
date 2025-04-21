import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Rules from "./pages/Rules.jsx";
import Scores from "./pages/Scores.jsx";
import NotFound from "./pages/NotFound.jsx";
import Footer from "./components/Footer.jsx";

// Game Pages
import AllGames from "./pages/game/AllGames.jsx";
import NewEasy from "./pages/game/NewGame.jsx";
import Game from "./pages/game/Game.jsx"; // 👈 new import

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/" element={<Home />} />
                    <Route path="/rules" element={<Rules />} />
                    <Route path="/scores" element={<Scores />} />

                    {/* Game Routes */}
                    <Route path="/games" element={<AllGames />} />
                    <Route path="/newgame" element={<NewEasy />} />
                    <Route path="/game/:gameId" element={<Game />} />

                    {/* Catch-All for 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
