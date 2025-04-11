import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rules from "./pages/Rules";
import Scores from "./pages/Scores";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

// Import Game and its sub-pages
import Game from "./pages/game/Game";  // ✅ Make sure this import is correct
import Easy from "./pages/game/Easy";
import Normal from "./pages/game/Normal";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>

                    {/* TODO -- add login/log out and sign up - log should be applied for all three depending on the situation*/}

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
