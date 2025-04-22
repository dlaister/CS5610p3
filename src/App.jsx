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
import NewGame from "./pages/game/NewGame.jsx";
import AllGames from "./pages/game/AllGames.jsx";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    {/* User Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Pages */}
                    <Route path="/" element={<Home />} />
                    <Route path="/rules" element={<Rules />} />
                    <Route path="/scores" element={<Scores />} />

                    {/* Game Routes */}
                    <Route path="/newgame" element={<NewGame />} />
                    <Route path="/games" element={<AllGames />} />

                    {/* Catch-All for 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
