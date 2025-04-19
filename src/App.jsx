import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Rules from "./pages/Rules.jsx";
import Scores from "./pages/Scores.jsx";
import NotFound from "./pages/NotFound.jsx";
import Footer from "./components/Footer.jsx";

// Import Game and its sub-pages
import Game from "./pages/game/Game.jsx";
import Easy from "./pages/game/Easy.jsx";
import Normal from "./pages/game/Normal.jsx";
import Register from "./pages/Register.jsx";


function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>

                    {/* TODO -- add login/log out and sign up - log should be applied for all three depending on the situation*/}

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/" element={<Home />} />
                    <Route path="/rules" element={<Rules />} />
                    <Route path="/scores" element={<Scores />} />

                    {/* Game Routes */}
                    <Route path="/game" element={<Game />} />
                    <Route path="/game/easy" element={<Easy />} />
                    <Route path="/game/normal" element={<Normal />} />
                    {/* TODO -- update to add new pages*/}

                    {/* Catch-All for 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
